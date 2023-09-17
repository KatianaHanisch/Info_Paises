import { DadosPaisesProps } from "../../types/DadosPaisesProps";

import { Ionicons } from "@expo/vector-icons";

import {
  ButtonContainer,
  ContainerItem,
  ContainerImage,
  Image,
  ContainerTextos,
  TituloItem,
  TextoLocalizacao,
  ContainerLocalizacao,
} from "./styles";

type Props = {
  dados: DadosPaisesProps;
  selecionaPais: (pais: DadosPaisesProps) => void;
};

export default function ItemLista({ dados, selecionaPais }: Props) {
  return (
    <>
      <ButtonContainer onPress={() => selecionaPais(dados)}>
        <ContainerItem>
          <ContainerImage>
            <Image source={{ uri: dados.flags.png }} />
          </ContainerImage>
          <ContainerTextos>
            <TituloItem>{dados.name.common}</TituloItem>
            <ContainerLocalizacao>
              <Ionicons name="ios-location-outline" size={20} color="#4f4f4f" />
              <TextoLocalizacao>{dados.continents}</TextoLocalizacao>
            </ContainerLocalizacao>
          </ContainerTextos>
        </ContainerItem>
      </ButtonContainer>
    </>
  );
}
