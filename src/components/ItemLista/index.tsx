import { DadosPaisesProps } from "../../types/DadosPaisesProps";

import {
  ContainerItem,
  ContainerImage,
  Image,
  ContainerTextos,
  TituloItem,
  SubtituloInformacoes,
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
        <SubtituloInformacoes></SubtituloInformacoes>
      </ContainerTextos>
    </ContainerItem>
  );
}
