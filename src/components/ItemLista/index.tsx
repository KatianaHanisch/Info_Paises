import { DadosPaisesProps } from "../../types/DadosPaisesProps";

import { Ionicons } from "@expo/vector-icons";

import {
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
};

export default function ItemLista({ dados }: Props) {
  return (
    <ContainerItem>
      <ContainerImage>
        <Image source={{ uri: dados.flags.png }} />
      </ContainerImage>
      <ContainerTextos>
        <TituloItem>{dados.name.common}</TituloItem>
        <ContainerLocalizacao>
          <Ionicons name="ios-location-outline" size={20} color="#4f4f4f" />
          <TextoLocalizacao>{dados.region}</TextoLocalizacao>
        </ContainerLocalizacao>
      </ContainerTextos>
    </ContainerItem>
  );
}
