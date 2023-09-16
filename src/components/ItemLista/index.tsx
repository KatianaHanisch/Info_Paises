import { Modal } from "react-native";

import { DadosPaisesProps } from "../../types/DadosPaisesProps";

import ModalPais from "../ModalPais";

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
  abrirModalDetalhesPais: () => void;
  abrirModalPais: boolean;
};

export default function ItemLista({
  dados,
  abrirModalDetalhesPais,
  abrirModalPais,
}: Props) {
  const name = dados.name.common;

  return (
    <>
      <ButtonContainer onPress={abrirModalDetalhesPais}>
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
        <Modal
          statusBarTranslucent={true}
          visible={abrirModalPais}
          transparent={true}
          animationType="slide"
        >
          <ModalPais
            abrirModal={abrirModalDetalhesPais}
            dados={dados}
            nomePais={dados.name.common}
          />
        </Modal>
      </ButtonContainer>
    </>
  );
}
