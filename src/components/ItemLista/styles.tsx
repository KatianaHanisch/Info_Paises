import styled from "styled-components/native";

export const ContainerItem = styled.View`
  margin: 8px 0;
  flex-direction: row;
  width: 100%;
  height: 90px;
  background-color: #cce3de;
  border-radius: 10px;
  align-items: center;
`;

export const ContainerImage = styled.View`
  background-color: #f1f1f1;
  height: 100%;
  z-index: 10;
  border-radius: 10px;
`;

export const Image = styled.Image`
  width: 115px;
  border-radius: 10px;
  height: 90px;
`;

export const ContainerTextos = styled.View`
  flex-direction: column;
  padding: 10px 25px;
  margin-left: -20px;
  height: 100%;
  border-radius: 10px;
`;

export const TituloItem = styled.Text`
  font-size: 19px;
  font-weight: bold;
  color: #38302e;
  margin-left: 3px;
`;

export const ContainerLocalizacao = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 5px;
`;

export const TextoLocalizacao = styled.Text`
  color: #4f4f4f;
  font-size: 14px;
`;
