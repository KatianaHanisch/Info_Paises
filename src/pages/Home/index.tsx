import React, { useState, useEffect } from "react";

import {
  FlatList,
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  Keyboard,
} from "react-native";

import { api } from "../../services/api";

import { DadosPaisesProps } from "../../types/DadosPaisesProps";

import ItemLista from "../../components/ItemLista";
import InputPesquisa from "../../components/InputPesquisa";

import { Snackbar } from "react-native-paper";

import { Container } from "../../../styles";
import { ContainerLista, ContainerButton, Button, TextButton } from "./styles";

export default function Home() {
  const [dados, setDados] = useState<DadosPaisesProps[]>([]);
  const [carregandoAplicacao, setCarregandoAplicacao] = useState(true);
  const [mensagemErro, setMensagemErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [limitePaises, setLimitePaises] = useState(20);
  const [abrirSnackbar, setAbrirSnackbar] = useState(false);
  const [tecladoVisivel, setTecladoVisivel] = useState(false);

  const paisesExibidos = dados.slice(0, limitePaises);

  async function getDados() {
    try {
      const { data } = await api.get(
        `/all?fields=name,languages,flags,population,region,capital`
      );

      setDados(data);
      setCarregandoAplicacao(false);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      setCarregandoAplicacao(false);
    }
  }

  async function getDadosPais(nomePais: string): Promise<void> {
    Keyboard.dismiss();
    setCarregando(true);

    try {
      const { data } = await api.get(`/name/${nomePais}`);
      setDados(data);
      setCarregando(false);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      setMensagemErro("Não foi possível encontrar o país buscado");
      setAbrirSnackbar(true);
      setCarregando(false);
    }
  }

  const carregarMaisPaises = () => {
    setLimitePaises(limitePaises + 20);
  };

  function fecharSnackbar() {
    setAbrirSnackbar(false);
  }

  function openSnackbar() {
    setAbrirSnackbar(true);
  }

  useEffect(() => {
    getDados();

    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setTecladoVisivel(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setTecladoVisivel(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  if (carregandoAplicacao) {
    return (
      <Container>
        <ActivityIndicator color={"#354f52"} size={55} />
      </Container>
    );
  } else {
    return (
      <Container>
        <StatusBar backgroundColor="#f1f1f1" barStyle="dark-content" />
        <Snackbar
          wrapperStyle={{ top: 20 }}
          style={{
            backgroundColor: "#830319",
            zIndex: 10,
          }}
          duration={2000}
          visible={abrirSnackbar}
          onDismiss={fecharSnackbar}
          action={{
            label: "Fechar",
          }}
        >
          {mensagemErro}
        </Snackbar>
        <InputPesquisa
          getDadosPais={getDadosPais}
          mensagemErro={setMensagemErro}
          abrirSnackbar={openSnackbar}
        />
        <ContainerLista>
          {carregando ? (
            <ActivityIndicator color={"#354f52"} size={55} />
          ) : (
            <>
              <FlatList
                style={styles.flatListStyle}
                data={paisesExibidos}
                renderItem={({ item }) => <ItemLista dados={item} />}
                keyExtractor={(item) => item.name.common}
              />
              {tecladoVisivel ? null : (
                <>
                  {limitePaises < dados.length && carregando === false ? (
                    <ContainerButton>
                      <Button onPress={carregarMaisPaises}>
                        <TextButton>Mostrar mais</TextButton>
                      </Button>
                    </ContainerButton>
                  ) : null}
                </>
              )}
            </>
          )}
        </ContainerLista>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  flatListStyle: {
    width: "100%",
    backgroundColor: "#f1f1f1",
  },
});
