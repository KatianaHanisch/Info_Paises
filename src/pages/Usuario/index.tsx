import { useContext, useEffect, useState } from "react";

import { StatusBar } from "react-native";

import { AuthContext } from "../../context/AuthContext";

import { dataBaseApp } from "../../services/firebaseConfig";

import {
  collection,
  doc,
  getDocs,
  DocumentData,
  QueryDocumentSnapshot,
} from "firebase/firestore";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { apiUnsplash } from "../../services/apiUnsplash";

import { FontAwesome } from "@expo/vector-icons";

import { Octicons } from "@expo/vector-icons";

import { EvilIcons } from "@expo/vector-icons";

import {
  Container,
  ContainerUsuario,
  ContainerIcone,
  Linha,
  ContainerInformacoesUsuario,
  LabelUsuario,
  InformacoesUsuario,
  Button,
  ContainerTextoButton,
  TextoButton,
} from "./styles";

interface DadosUsuario {
  nome: string;
  telefone: string;
  email: string;
  data: string;
}

export default function Usuario() {
  const [informacoesUsuario, setInformacoesUsuario] =
    useState<DadosUsuario | null>(null);
  const [imagem, setImagem] = useState<string | null>(null);

  const { singOut } = useContext(AuthContext);

  const uidUsuarioPromise: Promise<string | null> = obterUidUsuario();

  const apiKey = process.env.EXPO_PUBLIC_API_KEY;

  async function obterUidUsuario(): Promise<string | null> {
    try {
      const uid = await AsyncStorage.getItem("@Auth:uid");
      return uid;
    } catch (error) {
      console.error("Erro ao obter o UID do usuário:", error);
      return null;
    }
  }

  async function lerDadosUsuarios(uidUsuario: string): Promise<void> {
    try {
      const usersCollection = collection(dataBaseApp, "users");
      const userDoc = doc(usersCollection, uidUsuario);
      const dadosUsuariosCollection = collection(userDoc, "DadosUsuario");

      const querySnapshot = await getDocs(dadosUsuariosCollection);

      const dados: DadosUsuario[] = [];

      querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
        const dadosDocumento = doc.data() as DadosUsuario;
        dados.push(dadosDocumento);
      });

      setInformacoesUsuario(dados.length > 0 ? dados[0] : null);
    } catch (error) {
      console.log('Erro ao ler dados de "DadosUsuario":', error);
    }
  }

  async function getInformacoesUsuario(): Promise<void> {
    try {
      const uidUsuario = await uidUsuarioPromise;
      if (uidUsuario !== null) {
        await lerDadosUsuarios(uidUsuario);
      } else {
        console.error("UID do usuário é nulo.");
      }
    } catch (error) {
      console.error("Erro:", error);
    }
  }

  async function getImagem() {
    try {
      const { data } = await apiUnsplash.get(
        `search/photos?page=1&query=nature&client_id=${apiKey}`
      );

      const results = data.results;

      const randomIndex = Math.floor(Math.random() * results.length);

      setImagem(results[randomIndex]?.urls.regular || null);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  }

  useEffect(() => {
    getInformacoesUsuario();
    getImagem();
  }, []);

  return (
    <>
      <StatusBar
        animated={true}
        barStyle={"light-content"}
        translucent={true}
        backgroundColor=" rgba(0, 0, 0, 0.2)"
      />
      <Container
        source={
          imagem ? { uri: imagem } : require("../../../assets/imgInicio.jpg")
        }
      >
        <ContainerUsuario>
          <ContainerIcone>
            <FontAwesome name="user-circle-o" size={48} color="#3b3b3b" />
          </ContainerIcone>
          <ContainerInformacoesUsuario>
            <LabelUsuario>Nome</LabelUsuario>
            <InformacoesUsuario>{informacoesUsuario?.nome}</InformacoesUsuario>
            <Linha />
            <LabelUsuario>Email</LabelUsuario>
            <InformacoesUsuario>{informacoesUsuario?.email}</InformacoesUsuario>
            <Linha />
            <LabelUsuario>Telefone</LabelUsuario>
            <InformacoesUsuario>
              {informacoesUsuario?.telefone}
            </InformacoesUsuario>
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
    </>
  );
}
