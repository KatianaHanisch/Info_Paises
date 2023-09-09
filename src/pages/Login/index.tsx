import { useContext } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";

import { AuthContext } from "../../context/AuthContext";

export default function Login() {
  const navigation = useNavigation<NavigationProp<any>>();

  const { signIn, signed, erro, limpaErro, carregando } =
    useContext(AuthContext);

  if (!signed) {
    return (
      <View>
        <TouchableOpacity onPress={() => navigation.navigate("Cadastro")}>
          <Text>Teste</Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    navigation.navigate("Home");
  }
}
