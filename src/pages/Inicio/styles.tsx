import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
`;

export const ContainerTextos = styled.View`
  height: 180px;
  background-color: #f8f9fa;
  border-top-right-radius: 35px;
  border-top-left-radius: 35px;
  width: 100%;
  margin-top: -45px;
  padding: 30px 20px;
`;

export const TituloInicio = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: #38302e;
`;

export const SubtituloInicio = styled.Text`
  color: #5c5c5c;
  font-size: 16px;
  margin: 5px 0;
`;

export const ContainerButton = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  background-color: #f8f9fa;
  padding-bottom: 25px;
  padding-top: 5px;
`;

export const ButtonInicio = styled.TouchableOpacity`
  width: 50%;
  background-color: #354f52;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  padding: 8px 5px;
  border-radius: 10px;
`;

export const TextoButton = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #f1f1f1;
  margin-right: 5px;
`;
