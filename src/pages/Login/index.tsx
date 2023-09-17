import { useContext, useState, useEffect } from "react";

import { ActivityIndicator, Keyboard } from "react-native";

import { useNavigation, NavigationProp } from "@react-navigation/native";

import { Snackbar } from "react-native-paper";

import { AuthContext } from "../../context/AuthContext";

import {
  ContainerItens,
  HeaderLoginLogo,
  ContainerInputs,
  Input,
  Button,
  TextButton,
  ButtonCadastro,
  TextoButtonCadastro,
  Span,
} from "./styles";

import { Container, ContainerImage } from "../../../styles";
import { off } from "process";

export default function Login() {
  const navigation = useNavigation<NavigationProp<any>>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [mensagemErro, setMensagemErro] = useState("");
  const [abrirSnackbar, setAbrirSnackbar] = useState(false);
  const [tecladoVisivel, setTecladoVisivel] = useState(false);

  const { signIn, signed, erro, limpaErro, carregando } =
    useContext(AuthContext);

  function handleLogin() {
    Keyboard.dismiss();

    if (email === "" || password === "") {
      setMensagemErro("É necessário preencher todos os campos");
      setAbrirSnackbar(true);
      return;
    }

    signIn({ email, password });
  }

  function fecharSnackbar() {
    setAbrirSnackbar(false);
  }

  useEffect(() => {
    if (!erro) {
      setAbrirSnackbar(false);
      return;
    }

    setMensagemErro("Email ou senha inválido!");
    setAbrirSnackbar(true);

    const timer = setTimeout(() => {
      setAbrirSnackbar(false);
      limpaErro();
    }, 4000);
    return () => clearTimeout(timer);
  }, [erro]);

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

  if (!signed) {
    return (
      <Container>
        <Snackbar
          wrapperStyle={{ top: 20 }}
          duration={8000}
          style={{
            backgroundColor: "#830319",
            zIndex: 10,
          }}
          visible={abrirSnackbar}
          onDismiss={fecharSnackbar}
          action={{
            label: "Fechar",
          }}
        >
          {mensagemErro}
        </Snackbar>
        <ContainerImage source={require("../../../assets/imgLogin.jpg")} />
        <ContainerItens>
          {tecladoVisivel ? null : (
            <HeaderLoginLogo source={require("../../../assets/logo.png")} />
          )}
          <ContainerInputs>
            <Input
              placeholder="Digite seu email"
              value={email}
              onChangeText={(value) => setEmail(value)}
              autoComplete="off"
            />
            <Input
              placeholder="Digite sua senha"
              value={password}
              onChangeText={(value) => setPassword(value)}
              secureTextEntry={true}
            />
            <Button onPress={handleLogin}>
              {carregando ? (
                <ActivityIndicator size={24} color="#f1f1f1" />
              ) : (
                <TextButton>Entrar</TextButton>
              )}
            </Button>
            <ButtonCadastro onPress={() => navigation.navigate("Cadastro")}>
              <TextoButtonCadastro>
                Não tem conta? <Span>Cadastre-se</Span>
              </TextoButtonCadastro>
            </ButtonCadastro>
          </ContainerInputs>
        </ContainerItens>
      </Container>
    );
  } else {
    navigation.navigate("Home");
  }
}
