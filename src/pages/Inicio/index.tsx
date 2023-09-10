import { StatusBar } from "react-native";

import { useNavigation, NavigationProp } from "@react-navigation/native";

import { Feather } from "@expo/vector-icons";

import {
  Container,
  ContainerTextos,
  TituloInicio,
  SubtituloInicio,
  ContainerButton,
  ButtonInicio,
  TextoButton,
} from "./styles";

import { ContainerImage } from "../../../styles";

export default function Inicio() {
  const navigation = useNavigation<NavigationProp<any>>();

  return (
    <Container>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" />
      <ContainerImage source={require("../../../assets/imgInicio.jpg")} />
      <ContainerTextos>
        <TituloInicio>Explore o mundo, conheça novos países</TituloInicio>
        <SubtituloInicio>Faça seu login para ver mais</SubtituloInicio>
      </ContainerTextos>
      <ContainerButton>
        <ButtonInicio onPress={() => navigation.navigate("Login")}>
          <TextoButton>Acessar</TextoButton>
          <Feather name="arrow-right" size={26} color="#f1f1f1" />
        </ButtonInicio>
      </ContainerButton>
    </Container>
  );
}
