import { createStackNavigator } from "@react-navigation/stack";

import Login from "../pages/Login";
import Cadastro from "../pages/Cadastro";

const Stack = createStackNavigator();

export default function StackNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerMode: "screen",
        headerTintColor: "black",
        headerStyle: { backgroundColor: "transparent" },
      }}
    >
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          title: "Login",
        }}
      />
      <Stack.Screen
        name="Cadastro"
        component={Cadastro}
        options={{
          title: "Cadastro",
        }}
      />
    </Stack.Navigator>
  );
}
