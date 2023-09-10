import { useState, useEffect } from "react";

import { StatusBar } from "react-native";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import { useNavigation, NavigationProp } from "@react-navigation/native";
import { ActivityIndicator, Keyboard } from "react-native";

import { Snackbar } from "react-native-paper";

import {
  Container,
  ContainerItens,
  HeaderCadastroLogo,
  ContainerInputs,
  Input,
  ButtonCadastro,
  TextButton,
  ButtonLogin,
  TextoButtonLogin,
  Span,
} from "./styles";

import { ContainerImage } from "../../../styles";

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [abrirAlert, setAbrirAlert] = useState(false);
  const [corSnackbar, setCorSnackbar] = useState("verde");
  const [tecladoVisivel, setTecladoVisivel] = useState(false);

  const navigation = useNavigation<NavigationProp<any>>();

  const auth = getAuth();

  function fecharSnackbar() {
    setAbrirAlert(false);
  }

  async function criarCadastro() {
    Keyboard.dismiss();

    setCarregando(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then((response) => {
        console.log(response);
        setAbrirAlert(true);
        setCarregando(false);

        setTimeout(() => {
          navigation.navigate("Login");
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
        setCorSnackbar("vermelho");
        setAbrirAlert(true);
        setCarregando(false);
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
          wrapperStyle={{ top: 20 }}
          style={{
            backgroundColor: corSnackbar === "verde" ? "#085f1d" : "#830319",
            zIndex: 10,
          }}
          visible={abrirAlert}
          onDismiss={fecharSnackbar}
          action={{
            label: "Fechar",
            onPress: () => {},
          }}
        >
          {corSnackbar === "verde"
            ? "Cadastro criado com sucesso!"
            : "Ocorreu um erro ao criar o cadastro"}
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
            <Input
              placeholder="Digite seu telefone"
              value={telefone}
              onChangeText={(value) => setTelefone(value)}
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
