import styled from "styled-components/native";

export const Container = styled.ImageBackground`
  flex: 1;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

export const ContainerUsuario = styled.View`
  background-color: #f1f1f1;
  width: 90%;
  height: 70%;
  align-items: center;
  border-radius: 30px;
  padding: 30px 20px;
`;

export const ContainerIcone = styled.View`
  width: 100%;
  align-items: center;
  padding: 5px;
  margin-bottom: 5px;
`;

export const Linha = styled.View`
  width: 100%;
  height: 1px;
  background-color: #d6d6d6;
`;

export const ContainerInformacoesUsuario = styled.View`
  width: 100%;
  align-items: flex-start;
`;

export const LabelUsuario = styled.Text`
  color: #7f7f7f;
  font-size: 14px;
  padding-top: 10px;
`;

export const InformacoesUsuario = styled.Text`
  font-size: 18px;
  padding-bottom: 10px;
  color: #505050;
`;

export const Button = styled.TouchableOpacity`
  width: 100%;
  padding: 5px 0;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

export const ContainerTextoButton = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const TextoButton = styled.Text`
  font-size: 18px;
  color: #505050;
  margin-left: 5px;
`;
