import styled from "styled-components/native";

export const ContainerModal = styled.View`
  flex: 1;
  width: 100%;
  height: 100%;
  align-items: center;
  /* padding: 30px 20px; */
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
  background-color: #bcbcbc;
  position: absolute;
  border-radius: 50px;
  align-items: center;
  margin: 40px 20px;
`;

export const ContainerTextos = styled.View`
  background-color: #f1f1f1;
  flex: 4;
  width: 100%;
  margin-top: -40px;
  border-top-right-radius: 35px;
  border-top-left-radius: 35px;
  padding: 20px 10px;
  align-items: center;
  flex-direction: column;
`;

export const TituloModal = styled.Text`
  font-size: 25px;
  color: #38302e;
`;
