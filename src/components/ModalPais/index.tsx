import { useEffect, useState } from "react";

import { DadosPaisesProps } from "../../types/DadosPaisesProps";

import { apiUnsplash } from "../../services/apiUnsplash";
import { apiOpenWeather } from "../../services/apiOpenWeather";

import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import {
  ContainerModal,
  ContainerImage,
  Image,
  ContainerIcone,
  ContainerTextos,
  TituloModal,
  ContainerInformacoes,
  ContainerItem,
  LabelInformacoes,
  InformacaoTexto,
  Separador,
  ContainerLinguagem,
  ContainerItemLinguagem,
} from "./styles";

type ModalProps = {
  dados: DadosPaisesProps;
  closeModal: () => void;
};

type Languages = {
  [code: string]: string;
};

type Currency = {
  name: string;
  symbol: string;
};

type Currencies = {
  [code: string]: Currency;
};

export default function ModalPais({ dados, closeModal }: ModalProps) {
  const [imagem, setImagem] = useState<string | null>(null);
  const [temperatura, setTemperatura] = useState("");

  const apiKeyUnsplash = process.env.EXPO_PUBLIC_API_KEY_UNSPLASH;
  const apiKeyOpenWeather = process.env.EXPO_PUBLIC_API_KEY_OPENWEATHER;

  const nomePais = dados?.name.common || "";
  const nomeCapital = dados.capital;

  const languages: Languages = getLanguagesOrDefault(dados.languages);

  const currencies: Currencies = getCurrenciesOrDefault(dados.currencies);

  const formattedLanguages: string = formatLanguages(languages);

  const formattedCurrencies: string = formatCurrencies(currencies);

  let formattedCapitals: string;

  if (Array.isArray(nomeCapital)) {
    formattedCapitals = nomeCapital.join("\n");
  } else {
    formattedCapitals = nomeCapital;
  }

  function getLanguagesOrDefault(
    languagesData: Languages | string | undefined
  ): Languages {
    if (typeof languagesData === "string") {
      return {};
    }

    return languagesData || {};
  }

  function getCurrenciesOrDefault(
    currenciesData: Currencies | string | undefined
  ): Currencies {
    if (typeof currenciesData === "string") {
      return {};
    }

    return currenciesData || {};
  }

  async function getImagem() {
    try {
      const { data } = await apiUnsplash.get(
        `search/photos?page=1&query=${nomePais}&client_id=${apiKeyUnsplash}`
      );

      const results = data.results;

      const randomIndex = Math.floor(Math.random() * results.length);

      setImagem(results[randomIndex]?.urls.regular || null);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  }

  async function getTemperatura(nomeCidade: string): Promise<void> {
    try {
      const { data } = await apiOpenWeather.get(
        `data/2.5/weather?q=${nomeCidade}&appid=${apiKeyOpenWeather}&units=metric`
      );
      setTemperatura(data.main.temp.toFixed(1));
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  }

  function formatLanguages(languages: Languages): string {
    const languageEntries = Object.entries(languages);
    const formattedLanguages = languageEntries
      .map(([code, name]) => `${name}`)
      .join(", ");

    return formattedLanguages;
  }

  function formatCurrencies(currencies: Currencies): string {
    const currencyEntries = Object.entries(currencies);
    const formattedCurrencies = currencyEntries
      .map(([code, currency]) => `${currency.name} (${currency.symbol})`)
      .join("\n");

    return formattedCurrencies;
  }

  useEffect(() => {
    getImagem();
    getTemperatura(nomeCapital);
  }, []);

  return (
    <ContainerModal>
      <ContainerImage>
        {imagem && <Image source={{ uri: imagem }} />}
        <ContainerIcone onPress={closeModal}>
          <Feather name="arrow-left" size={26} color="#252525" />
        </ContainerIcone>
      </ContainerImage>
      <ContainerTextos>
        <TituloModal>{nomePais}</TituloModal>
        <ContainerInformacoes>
          <ContainerItem>
            <LabelInformacoes>população</LabelInformacoes>
            <InformacaoTexto>
              {dados.population.toLocaleString()}
            </InformacaoTexto>
          </ContainerItem>
          <Separador />
          <ContainerItem>
            <LabelInformacoes>continente</LabelInformacoes>
            <InformacaoTexto>{dados.continents}</InformacaoTexto>
          </ContainerItem>
          <Separador />
          <ContainerItem>
            <LabelInformacoes>area</LabelInformacoes>
            <InformacaoTexto>{`${dados.area.toLocaleString()} km²`}</InformacaoTexto>
          </ContainerItem>
        </ContainerInformacoes>
        <ContainerLinguagem>
          <ContainerItemLinguagem>
            <AntDesign name="team" size={28} color="#555555" />
            <LabelInformacoes>idioma</LabelInformacoes>
            <InformacaoTexto>{formattedLanguages}</InformacaoTexto>
          </ContainerItemLinguagem>
          <ContainerItemLinguagem>
            <FontAwesome5 name="coins" size={24} color="#555555" />
            <LabelInformacoes>moeda</LabelInformacoes>
            <InformacaoTexto>{formattedCurrencies}</InformacaoTexto>
          </ContainerItemLinguagem>
        </ContainerLinguagem>
        <ContainerLinguagem>
          <ContainerItemLinguagem>
            <MaterialIcons name="location-city" size={28} color="#555555" />
            <LabelInformacoes>capital</LabelInformacoes>
            <InformacaoTexto>{formattedCapitals}</InformacaoTexto>
          </ContainerItemLinguagem>
          <ContainerItemLinguagem>
            <MaterialCommunityIcons
              name="temperature-celsius"
              size={28}
              color="#555555"
            />
            <LabelInformacoes>temperatura</LabelInformacoes>
            <InformacaoTexto>
              {temperatura === "" ? "não encontrado" : `${temperatura}°`}
            </InformacaoTexto>
          </ContainerItemLinguagem>
        </ContainerLinguagem>
      </ContainerTextos>
    </ContainerModal>
  );
}
