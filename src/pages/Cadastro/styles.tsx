import styled from "styled-components/native";

import MaskInput from "react-native-mask-input";

export const ContainerItens = styled.View`
  width: 100%;
  align-items: center;
  flex-direction: column;
  padding: 25px 0px;
  flex: 2.5;
  background-color: #f8f9fa;
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
  margin-top: -100px;
`;

export const HeaderCadastroLogo = styled.Image``;

export const ContainerInputs = styled.View`
  width: 100%;
  align-items: center;
  margin-top: 20px;
`;

export const Input = styled.TextInput`
  background-color: #fefefe;
  width: 90%;
  font-size: 18px;
  padding: 10px;
  border-radius: 8px;
  color: #535353;
  border: 1px solid #d6d6d6;
  margin-bottom: 15px;
`;
export const InputTelefone = styled(MaskInput)`
  background-color: #fefefe;
  width: 90%;
  font-size: 18px;
  padding: 10px;
  border-radius: 8px;
  color: #535353;
  border: 1px solid #d6d6d6;
  margin-bottom: 15px;
`;

export const ButtonCadastro = styled.TouchableOpacity`
  padding: 10px;
  align-items: center;
  background-color: #354f52;
  width: 90%;
  border-radius: 8px;
`;
export const TextButton = styled.Text`
  font-size: 16px;
  color: #f1f1f1;
  font-weight: bold;
`;

export const ButtonLogin = styled.TouchableOpacity`
  width: 100%;
  align-items: center;
  background: transparent;
  margin-top: 10px;
`;

export const TextoButtonLogin = styled.Text`
  font-size: 16px;
  color: #555454;
`;
export const Span = styled.Text`
  font-size: 16px;
  color: #636262;
  text-decoration: underline;
`;
