import React, { useState, useEffect } from "react";

import {
  FlatList,
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  Keyboard,
  TouchableOpacity,
  Modal,
} from "react-native";

import { api } from "../../services/api";

import { DadosPaisesProps } from "../../types/DadosPaisesProps";

import ItemLista from "../../components/ItemLista";
import InputPesquisa from "../../components/InputPesquisa";
import ModalPais from "../../components/ModalPais";

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
  const [visualizandoPesquisa, setVisualizandoPesquisa] = useState(false);

  const paisesExibidos = dados.slice(0, limitePaises);

  const [abrirModalPais, setAbrirModalPais] = useState(false);
  const [input, setInput] = useState("");

  const [paisSelecionado, setPaisSelecionado] = useState<DadosPaisesProps>(
    {} as DadosPaisesProps
  );

  async function selecionaPais(pais: DadosPaisesProps) {
    setPaisSelecionado(pais);
    setAbrirModalPais(true);
  }

  function mostrarTodosPaises() {
    setVisualizandoPesquisa(false);
    getDados();
  }

  async function getDados() {
    try {
      const { data } = await api.get(
        `/all?fields=name,capital,currencies,languages,flags,population,continents,area`
      );

      setDados(data);
      setCarregandoAplicacao(false);
      setVisualizandoPesquisa(false);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  }

  async function getDadosPais(nomePais: string): Promise<void> {
    Keyboard.dismiss();

    setInput("");

    setCarregando(true);

    try {
      const { data } = await api.get(`/name/${nomePais}`);
      setDados(data);
      setCarregando(false);
      setVisualizandoPesquisa(true);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      setMensagemErro("Não foi possível encontrar o país buscado");
      setAbrirSnackbar(true);
      setCarregando(false);
    }
  }

  const handleBuscarPais = () => {
    if (input.length < 3) {
      setAbrirSnackbar(true);
      setMensagemErro("Digite mais de duas letras para prosseguir a pesquisa");
      return;
    }

    getDadosPais(input);
  };

  const carregarMaisPaises = () => {
    setLimitePaises(limitePaises + 20);
  };

  function fecharSnackbar() {
    setAbrirSnackbar(false);
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
        <StatusBar
          backgroundColor={
            abrirModalPais ? " rgba(0, 0, 0, 0.2)" : "transparent"
          }
          barStyle={abrirModalPais ? "light-content" : "dark-content"}
          translucent={true}
        />
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
          setInput={setInput}
          input={input}
          handleBuscarPais={handleBuscarPais}
        />
        <ContainerLista>
          {carregando ? (
            <ActivityIndicator color={"#354f52"} size={55} />
          ) : (
            <>
              <FlatList
                style={styles.flatListStyle}
                data={paisesExibidos}
                renderItem={({ item }) => (
                  <ItemLista dados={item} selecionaPais={selecionaPais} />
                )}
                keyExtractor={(item) => item.name.common}
              />

              {tecladoVisivel ? null : (
                <>
                  {visualizandoPesquisa && (
                    <ContainerButton>
                      <Button onPress={mostrarTodosPaises}>
                        <TextButton>Voltar</TextButton>
                      </Button>
                    </ContainerButton>
                  )}
                </>
              )}

              {tecladoVisivel ? null : (
                <>
                  {limitePaises < dados.length && carregando === false ? (
                    <ContainerButton>
                      <Button onPress={carregarMaisPaises}>
                        <TextButton>Mostrar Mais</TextButton>
                      </Button>
                    </ContainerButton>
                  ) : null}
                </>
              )}
            </>
          )}
        </ContainerLista>
        <Modal
          statusBarTranslucent={true}
          visible={abrirModalPais}
          transparent={true}
          animationType="slide"
        >
          <ModalPais
            dados={paisSelecionado}
            closeModal={() => setAbrirModalPais(false)}
          />
        </Modal>
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
