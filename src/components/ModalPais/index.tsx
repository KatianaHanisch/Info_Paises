import { useEffect, useState } from "react";

import { DadosPaisesProps } from "../../types/DadosPaisesProps";

import { apiUnsplash } from "../../services/apiUnsplash";

import { Feather } from "@expo/vector-icons";

import {
  ContainerModal,
  ContainerImage,
  Image,
  ContainerIcone,
  ContainerTextos,
  TituloModal,
} from "./styles";

type ModalProps = {
  abrirModal: () => void;
  dados: DadosPaisesProps;
  nomePais: string;
};

export default function ModalPais({ abrirModal, dados, nomePais }: ModalProps) {
  const [imagem, setImagem] = useState<string | null>(null);

  const apiKey = process.env.EXPO_PUBLIC_API_KEY;

  async function getImagem() {
    try {
      const { data } = await apiUnsplash.get(
        `search/photos?page=1&query=canada&client_id=${apiKey}`
      );
      // const { data } = await apiUnsplash.get(
      //   `search/photos?page=1&query=${nomePais}&client_id=${apiKey}`
      // );

      const results = data.results;

      const randomIndex = Math.floor(Math.random() * results.length);

      setImagem(results[randomIndex]?.urls.regular || null);

      //   setCarregandoAplicacao(false);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      //   setCarregandoAplicacao(false);
    }
  }

  useEffect(() => {
    getImagem();
  }, []);

  return (
    <ContainerModal>
      <ContainerImage>
        {imagem && <Image source={{ uri: imagem }} />}
        <ContainerIcone onPress={abrirModal}>
          <Feather name="arrow-left" size={26} color="#252525" />
        </ContainerIcone>
      </ContainerImage>
      <ContainerTextos>
        <TituloModal>{dados.name.common}</TituloModal>
      </ContainerTextos>
    </ContainerModal>
  );
}
