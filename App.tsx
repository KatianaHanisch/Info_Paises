import { StatusBar } from "expo-status-bar";

import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./src/context/AuthContext";

import Routes from "./src/routes";

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Routes />
      </AuthProvider>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
