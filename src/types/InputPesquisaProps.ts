export type InputPesquisaProps = {
  getDadosPais: (nomePais: string) => void;
  abrirSnackbar: () => void;
  mensagemErro: (mensagem: string) => void;
};
