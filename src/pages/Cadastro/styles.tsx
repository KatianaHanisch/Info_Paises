import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  width: 100%;
  background: #eae6e5;
  align-items: center;
`;

export const ContainerItens = styled.View`
  width: 100%;
  align-items: center;
  flex-direction: column;
  padding: 50px 5px;
`;

export const TextoHeaderLogin = styled.Text`
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #252525;
`;

export const Input = styled.TextInput`
  background-color: #fefefe;
  width: 90%;
  font-size: 18px;
  padding: 10px;
  border-radius: 8px;
  color: #121212;
  margin-bottom: 15px;
`;

export const Button = styled.TouchableOpacity`
  padding: 10px;
  align-items: center;
  background-color: white;
  width: 90%;
  border-radius: 8px;
`;
export const TextButton = styled.Text`
  font-size: 16px;
  color: blue;
`;
