import styled from "styled-components/native";

export const ContainerItens = styled.View`
  width: 100%;
  flex: 1.5;
  align-items: center;
  flex-direction: column;
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
  margin-top: -100px;
  background-color: #f8f9fa;
  padding-top: 40px;
`;

export const HeaderLoginLogo = styled.Image``;

export const ContainerInputs = styled.View`
  margin-top: 30px;
  width: 100%;
  align-items: center;
`;

export const Input = styled.TextInput`
  background-color: #fefefe;
  width: 90%;
  font-size: 18px;
  padding: 10px;
  border-radius: 8px;
  color: #535353;
  margin-bottom: 15px;
  border: 1px solid #d6d6d6;
`;

export const Button = styled.TouchableOpacity`
  padding: 10px;
  align-items: center;
  justify-content: flex-start;
  background-color: #354f52;
  width: 90%;
  border-radius: 8px;
`;
export const TextButton = styled.Text`
  font-size: 16px;
  color: #f1f1f1;
  font-weight: bold;
`;

export const ButtonCadastro = styled.TouchableOpacity`
  width: 100%;
  align-items: center;
  background: transparent;
  margin-top: 10px;
`;

export const TextoButtonCadastro = styled.Text`
  font-size: 16px;
  color: #555454;
`;
export const Span = styled.Text`
  font-size: 16px;
  color: #636262;
  text-decoration: underline;
`;
