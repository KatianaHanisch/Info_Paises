import { createContext, useState } from "react";
import { getApp } from "../services/firebaseConfig";

import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";

import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({
  signIn: (props: SignInProps) => {},
  signed: false,
  singOut: () => {},
  erro: false,
  limpaErro: () => {},
  carregando: false,
});

type SignInProps = {
  email: string;
  password: string;
};

export const AuthProvider = ({ children }: any) => {
  const [usuario, setUsuario] = useState(null);
  const [erro, setErro] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(getApp);

  const signIn = ({ email, password }: SignInProps) => {
    setCarregando(true);
    signInWithEmailAndPassword(email, password)
      .then((response: any) => {
        sessionStorage.setItem("@Auth:token", response.user.accessToken);
        sessionStorage.setItem("@Auth:email", response.user.email);
        sessionStorage.setItem("@Auth:usuario", response.user.uid);
        setUsuario(response);
        setCarregando(false);
      })
      .catch((error) => {
        setErro(true);
        setCarregando(false);
        console.log(error);
      });
  };

  function singOut() {
    sessionStorage.clear();
    setUsuario(null);
  }

  function limpaErro() {
    setErro(false);
  }

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signed: !!usuario,
        singOut,
        erro,
        limpaErro,
        carregando,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
