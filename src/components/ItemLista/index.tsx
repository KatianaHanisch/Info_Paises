import { useState } from "react";

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
};

export default function ItemLista({ dados }: Props) {
  const [abrirModalPais, setAbrirModalPais] = useState(false);

  function abrirModalDetalhesPais() {
    setAbrirModalPais(!abrirModalPais);
  }

  return (
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
      <Modal visible={abrirModalPais} transparent={true} animationType="slide">
        <ModalPais abrirModal={abrirModalDetalhesPais} dados={dados} />
      </Modal>
    </ButtonContainer>
  );
}
