import { useState } from "react";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import {
  Container,
  ContainerItens,
  TextoHeaderLogin,
  Button,
  TextButton,
  Input,
} from "./styles";

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = getAuth();

  async function criarCadastro() {
    createUserWithEmailAndPassword(auth, email, password)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <Container>
      <ContainerItens>
        <TextoHeaderLogin>Cadastro</TextoHeaderLogin>
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
        <Button onPress={criarCadastro}>
          <TextButton>Cadastrar</TextButton>
        </Button>
      </ContainerItens>
    </Container>
  );
}
