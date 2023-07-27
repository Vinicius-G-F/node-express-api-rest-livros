import ErroDeRequisicaoIncorreta from "./ErroDeRequisicaoIncorreta.js";

class ErroDeValidacao extends ErroDeRequisicaoIncorreta {
  constructor(erro){
    const mensagensDeErro = Object.values(erro.errors)
      .map(erro => erro.message)
      .join("; ");
    super(`Os seguintes erros aconteceram: ${mensagensDeErro}`);
  }
}

export default ErroDeValidacao;