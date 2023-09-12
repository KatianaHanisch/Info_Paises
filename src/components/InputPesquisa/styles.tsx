import styled from "styled-components/native";

export const Container = styled.View`
  width: 95%;
  background-color: #f8f9fa;
  margin-top: 30px;
  padding: 5px;
  flex-direction: row;
  align-items: center;
  border: 1px solid #d6d6d6;
  border-radius: 5px;
  margin-bottom: 5px;
`;
export const Input = styled.TextInput`
  width: 100%;
  font-size: 16px;
  color: #626262;
  margin-left: 5px;
`;

export const ContainerButton = styled.View`
  margin: 8px 0;
  width: 95%;
  align-items: center;
`;
export const Button = styled.TouchableOpacity`
  width: 100%;
  background-color: #354f52;
  padding: 8px;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

export const TextButton = styled.Text`
  font-size: 16px;
  color: #f1f1f1;
  font-weight: bold;
  margin-left: 2px;
`;
