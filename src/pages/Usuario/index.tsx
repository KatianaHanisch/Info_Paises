import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../../context/AuthContext";

import { dataBaseApp } from "../../services/firebaseConfig";
import { doc, getDocs, collection, query } from "firebase/firestore";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { FontAwesome } from "@expo/vector-icons";

import { Octicons } from "@expo/vector-icons";

import { EvilIcons } from "@expo/vector-icons";

import {
  Container,
  ContainerUsuario,
  ContainerIcone,
  TituloUsuario,
  Linha,
  ContainerInformacoesUsuario,
  LabelUsuario,
  InformacoesUsuario,
  Button,
  ContainerTextoButton,
  TextoButton,
} from "./styles";

export default function Usuario() {
  const [informacoesUsuario, setInformacoesUsuario] = useState();

  const { singOut } = useContext(AuthContext);

  async function lerDadosUsuarios(uidUsuario: any) {
    try {
      const usersCollection = collection(dataBaseApp, "users");
      const userDoc = doc(usersCollection, uidUsuario);
      const dadosUsuariosCollection = collection(userDoc, "DadosUsuario");

      const querySnapshot = await getDocs(dadosUsuariosCollection);

      const dados: any = [];

      querySnapshot.forEach((doc) => {
        // doc.data() contém os dados do documento
        dados.push(doc.data());
      });

      return dados;
    } catch (error) {
      console.error('Erro ao ler dados de "DadosUsuario":', error);
      throw error;
    }
  }

  // Exemplo de uso da função
  const uidUsuario = AsyncStorage.getItem("@Auth:uid");

  lerDadosUsuarios(uidUsuario)
    .then((dados) => {
      console.log('Dados lidos de "DadosUsuario":', dados);
    })
    .catch((error) => {
      console.error('Erro ao ler dados de "DadosUsuario":', error);
    });
  useEffect(() => {
    lerDadosUsuarios(uidUsuario);
  }, []);
  return (
    <Container>
      <ContainerUsuario>
        <ContainerIcone>
          <FontAwesome name="user-circle-o" size={48} color="#3b3b3b" />
        </ContainerIcone>
        <TituloUsuario>Katiana H. Hanisch</TituloUsuario>
        <Linha />
        <ContainerInformacoesUsuario>
          <LabelUsuario>Email</LabelUsuario>
          <InformacoesUsuario>katianahanisch@gmail.com</InformacoesUsuario>
          <Linha />
          <LabelUsuario>Telefone</LabelUsuario>
          <InformacoesUsuario>(66) 996404752</InformacoesUsuario>
          <Linha />
          <Button onPress={singOut}>
            <ContainerTextoButton>
              <Octicons name="sign-out" size={22} color="#830319" />
              <TextoButton>Sair</TextoButton>
            </ContainerTextoButton>
            <EvilIcons name="chevron-right" size={28} color="#505050" />
          </Button>
        </ContainerInformacoesUsuario>
      </ContainerUsuario>
    </Container>
  );
}
