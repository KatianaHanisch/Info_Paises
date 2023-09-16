import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

import Home from "../pages/Home";
import Usuario from "../pages/Usuario";
import Busca from "../pages/Busca";

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#354f52",
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          position: "absolute",
          backgroundColor: "#f8f9fa",
          borderTopWidth: 0,
          elevation: 0,
          borderRadius: 4,
          height: 44,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, focused }) => {
            if (focused) {
              return <Ionicons name="home" size={26} color={color} />;
            }
            return <Ionicons name="home-outline" size={26} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Usuario"
        component={Usuario}
        options={{
          tabBarIcon: ({ color, focused }) => {
            if (focused) {
              return <FontAwesome5 name="user-alt" size={24} color={color} />;
            }
            return <FontAwesome5 name="user" size={24} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}
