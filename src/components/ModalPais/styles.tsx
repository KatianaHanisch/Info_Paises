import styled from "styled-components/native";

export const ContainerModal = styled.View`
  flex: 1;
  width: 100%;
  height: 100%;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
`;

export const ContainerImage = styled.View`
  flex: 2;
  height: 100%;
  width: 100%;
`;

export const Image = styled.ImageBackground`
  height: 100%;
  width: 100%;
`;

export const ContainerIcone = styled.TouchableOpacity`
  padding: 5px;
  background-color: #f0f0f0;
  position: absolute;
  border-radius: 50px;
  align-items: center;
  margin: 40px 20px;
`;

export const ContainerTextos = styled.View`
  background-color: #f1f1f1;
  flex: 4;
  width: 100%;
  margin-top: -30px;
  border-top-right-radius: 35px;
  border-top-left-radius: 35px;
  padding: 20px 10px;
  align-items: center;
  flex-direction: column;
`;

export const TituloModal = styled.Text`
  font-size: 28px;
  color: #3d3d3d;
`;

export const ContainerInformacoes = styled.View`
  width: 100%;
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
  margin: 10px 0;
`;

export const Separador = styled.View`
  height: 50px;
  width: 1px;
  background-color: #d6d6d6;
`;

export const ContainerItem = styled.View`
  flex-direction: column;
  align-items: center;
`;

export const LabelInformacoes = styled.Text`
  font-size: 13px;
  color: #7f7f7f;
  margin-bottom: 2px;
`;

export const InformacaoTexto = styled.Text`
  font-size: 16px;
  color: #3d3d3d;
`;

export const ContainerLinguagem = styled.View`
  flex-direction: row;
  margin-top: 10px;
  width: 100%;
  justify-content: space-around;
`;

export const ContainerItemLinguagem = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #d6d6d6;
  width: 48%;
  padding: 10px;
  border-radius: 10px;
`;
