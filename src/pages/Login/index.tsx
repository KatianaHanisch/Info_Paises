import { useContext, useState } from "react";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { ActivityIndicator, Easing, Keyboard } from "react-native";

import { AuthContext } from "../../context/AuthContext";

import {
  Container,
  ContainerItens,
  TextoHeaderLogin,
  Button,
  TextButton,
  Input,
  ButtonCadastro,
  TextoButtonCadastro,
  Span,
} from "./styles";

export default function Login() {
  const navigation = useNavigation<NavigationProp<any>>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn, signed, erro, limpaErro, carregando } =
    useContext(AuthContext);

  function handleLogin() {
    Keyboard.dismiss();

    if (email === "" || password === "") return;

    signIn({ email, password });
    // console.log(email, password);
  }

  if (!signed) {
    return (
      <Container>
        <ContainerItens>
          <TextoHeaderLogin>Login</TextoHeaderLogin>
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
          <Button onPress={handleLogin}>
            <TextButton>Entrar</TextButton>
          </Button>
          <ButtonCadastro onPress={() => navigation.navigate("Cadastro")}>
            <TextoButtonCadastro>
              Não tem conta? <Span>Cadastre-se</Span>
            </TextoButtonCadastro>
          </ButtonCadastro>
        </ContainerItens>
      </Container>
    );
  } else {
    navigation.navigate("Home");
  }
}
