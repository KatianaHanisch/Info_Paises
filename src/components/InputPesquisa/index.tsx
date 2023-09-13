import { useState } from "react";

import { InputPesquisaProps } from "../../types//InputPesquisaProps";

import { Ionicons } from "@expo/vector-icons";

import {
  Container,
  Input,
  ContainerButton,
  Button,
  TextButton,
} from "./styles";

export default function InputPesquisa({
  getDadosPais,
  abrirSnackbar,
  mensagemErro,
}: InputPesquisaProps) {
  const [input, setInput] = useState("");

  const handleBuscarPais = () => {
    if (input.length < 3) {
      abrirSnackbar();
      mensagemErro("Digite mais de duas letras para prosseguir a pesquisa");
      return;
    }

    getDadosPais(input);
  };

  return (
    <>
      <Container>
        <Ionicons name="search-outline" size={22} color="#a9a9a9" />
        <Input
          placeholder="Digite o nome do pais que busca"
          onChangeText={(text) => setInput(text)}
          onSubmitEditing={handleBuscarPais}
        />
      </Container>
      <ContainerButton>
        <Button onPress={handleBuscarPais}>
          <Ionicons name="search" size={22} color="#f1f1f1" />
          <TextButton>Buscar</TextButton>
        </Button>
      </ContainerButton>
    </>
  );
}
