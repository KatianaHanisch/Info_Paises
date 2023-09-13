import { useEffect, useState } from "react";

import { StatusBar } from "react-native";

import { DadosPaisesProps } from "../../types/DadosPaisesProps";

import { apiUnsplash } from "../../services/apiUnsplash";

import { Feather } from "@expo/vector-icons";

import {
  ContainerModal,
  ContainerImage,
  ContainerIcone,
  TituloModal,
} from "./styles";

type ImagemProps = {
  id: string;
};

type ModalProps = {
  abrirModal: () => void;
  dados: DadosPaisesProps;
};

export default function ModalPais({ abrirModal, dados }: ModalProps) {
  const [imagens, setImagens] = useState<ImagemProps[]>([]);

  async function getDados() {
    try {
      const { data } = await apiUnsplash.get(
        `search/photos?page=1&query=andorra&client_id=d9xBFDpkW7nxfSG16oBziZTRgwr8fFoZ1tNFjBtgoLA`
      );

      const results = data.results;

      setImagens(results);
      //   setCarregandoAplicacao(false);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      //   setCarregandoAplicacao(false);
    }
  }

  useEffect(() => {
    getDados();
  }, []);
  return (
    <ContainerModal>
      <StatusBar backgroundColor="transparent" barStyle={"light-content"} />
      <ContainerImage>
        <ContainerIcone onPress={abrirModal}>
          <Feather name="arrow-left" size={24} color="#38302e" />
        </ContainerIcone>
      </ContainerImage>
      <TituloModal>{dados.name.common}</TituloModal>
      {imagens.map((imagem) => (
        <TituloModal key={imagem.id}>{imagem.id}</TituloModal>
      ))}
    </ContainerModal>
  );
}
