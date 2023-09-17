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
  input,
  setInput,
  handleBuscarPais,
}: InputPesquisaProps) {
  return (
    <>
      <Container>
        <Ionicons name="search-outline" size={22} color="#a9a9a9" />
        <Input
          placeholder="Digite o nome do pais que busca"
          onChangeText={(text) => setInput(text)}
          onSubmitEditing={handleBuscarPais}
          value={input}
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
