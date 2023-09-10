import { createStackNavigator } from "@react-navigation/stack";

import Inicio from "../pages/Inicio";
import Login from "../pages/Login";
import Cadastro from "../pages/Cadastro";

const Stack = createStackNavigator();

export default function StackNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="Inicio"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Inicio"
        component={Inicio}
        options={{
          title: "Inicio",
        }}
      />
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
