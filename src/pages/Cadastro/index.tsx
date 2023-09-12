import { useState, useEffect } from "react";

import { useNavigation, NavigationProp } from "@react-navigation/native";
import { ActivityIndicator, Keyboard, StatusBar } from "react-native";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { dataBaseApp } from "../../services/firebaseConfig";
import { addDoc, collection, doc, serverTimestamp } from "firebase/firestore";

import { Snackbar } from "react-native-paper";

import {
  ContainerItens,
  HeaderCadastroLogo,
  ContainerInputs,
  Input,
  InputTelefone,
  ButtonCadastro,
  TextButton,
  ButtonLogin,
  TextoButtonLogin,
  Span,
} from "./styles";

import { Container, ContainerImage } from "../../../styles";

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [carregando, setCarregando] = useState(false);
  const [abrirSnackbar, setAbrirSnackbar] = useState(false);
  const [criadoSucesso, setCriadoSucesso] = useState(false);
  const [tecladoVisivel, setTecladoVisivel] = useState(false);
  const [messagemErro, setMensagemErro] = useState("");

  const navigation = useNavigation<NavigationProp<any>>();

  const auth = getAuth();

  const maskTelefone = [
    "(",
    /\d/,
    /\d/,
    ")",
    " ",
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    "-",
    /\d/,
    /\d/,
    /\d/,
    /\d/,
  ];

  function verificaEmail(email: string) {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    return reg.test(email);
  }

  function fecharSnackbar() {
    setAbrirSnackbar(false);
  }

  async function criarCadastro() {
    Keyboard.dismiss();

    if (nome === "" || telefone === "" || email === "" || password === "") {
      setMensagemErro("É necessário preencher todos os campos");
      setAbrirSnackbar(true);
      return;
    }

    if (verificaEmail(email) === false) {
      setMensagemErro("Digite um email válido");
      setAbrirSnackbar(true);
      return;
    }

    if (telefone.length !== 15) {
      setMensagemErro("Digite um número de telefone válido");
      setAbrirSnackbar(true);
      return;
    }

    setCarregando(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then((response) => {
        setCriadoSucesso(true);
        setAbrirSnackbar(true);
        setCarregando(false);

        salvarDadosBanco(response.user.uid);

        setTimeout(() => {
          navigation.navigate("Login");
        }, 2000);
      })

      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          setMensagemErro(
            "Esse email já está sendo usado. Tente novamente com outro email"
          );
          setAbrirSnackbar(true);
          setCarregando(false);
        } else if (error.code === "auth/weak-password") {
          setMensagemErro("A senha precisa ter no minímo 6 caracteres");
          setAbrirSnackbar(true);
          setCarregando(false);
        } else {
          setMensagemErro(
            "Ocorreu um erro ao criar o cadastro. Tente novamente"
          );
          setAbrirSnackbar(true);
          setCarregando(false);
          console.log(error);
        }
      });
  }

  async function salvarDadosBanco(uidUsuario: string) {
    const dadosUsuarios = "DadosUsuario";
    const usersCollection = collection(dataBaseApp, "users");
    const userDoc = doc(usersCollection, uidUsuario);
    const projetosCollection = collection(userDoc, dadosUsuarios);

    await addDoc(projetosCollection, {
      nome,
      telefone,
      email,
      data: serverTimestamp(),
    });
  }

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setTecladoVisivel(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setTecladoVisivel(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <>
      <Container>
        <StatusBar backgroundColor="transparent" barStyle="light-content" />
        <Snackbar
          wrapperStyle={{ top: 18 }}
          style={{
            backgroundColor: criadoSucesso ? "#085f1d" : "#830319",
            zIndex: 10,
          }}
          visible={abrirSnackbar}
          onDismiss={fecharSnackbar}
          action={{
            label: "Fechar",
          }}
        >
          {criadoSucesso ? "Cadastro criado com sucesso!" : messagemErro}
        </Snackbar>
        <ContainerImage source={require("../../../assets/imgCadastro.jpg")} />
        <ContainerItens>
          {tecladoVisivel ? null : (
            <HeaderCadastroLogo source={require("../../../assets/logo.png")} />
          )}
          <ContainerInputs>
            <Input
              placeholder="Digite seu nome"
              value={nome}
              onChangeText={(value) => setNome(value)}
            />
            <InputTelefone
              placeholder="Digite seu telefone"
              value={telefone}
              keyboardType="numeric"
              onChangeText={(masked) => {
                setTelefone(masked);
              }}
              mask={maskTelefone}
            />
            <Input
              placeholder="Digite seu email"
              value={email}
              onChangeText={(value) => setEmail(value)}
            />
            <Input
              placeholder="Digite sua senha"
              value={password}
              onChangeText={(value) => setPassword(value)}
              secureTextEntry={true}
            />
            <ButtonCadastro onPress={criarCadastro}>
              {carregando ? (
                <ActivityIndicator size={22} color={"#f1f1f1"} />
              ) : (
                <TextButton>Cadastrar</TextButton>
              )}
            </ButtonCadastro>
            <ButtonLogin onPress={() => navigation.navigate("Login")}>
              <TextoButtonLogin>
                Já tem conta? <Span>Login</Span>
              </TextoButtonLogin>
            </ButtonLogin>
          </ContainerInputs>
        </ContainerItens>
      </Container>
    </>
  );
}
