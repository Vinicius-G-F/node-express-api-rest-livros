import ErroBase from "./ErroBase.js";

class ErroDeRequisicaoIncorreta extends ErroBase {
  constructor(mensagem = "Dados fornecidos de forma incorreta"){
    super(mensagem, 400);
  }
}
export default ErroDeRequisicaoIncorreta;