import mongoose from "mongoose";
import ErroBase from "../erros/ErroBase.js";
import ErroDeRequisicaoIncorreta from "../erros/ErroDeRequisicaoIncorreta.js";
import ErroDeValidacao from "../erros/ErroDeValidacao.js";

// eslint-disable-next-line no-unused-vars
export default function manipuladorDeErros (erro, req, res, next) {

  console.log(erro);

  if(erro instanceof mongoose.Error.CastError) {

    new ErroDeRequisicaoIncorreta().enviarResposta(res);

  } else if(erro instanceof mongoose.Error.ValidationError){
    
    new ErroDeValidacao(erro).enviarResposta(res);

  } else if(erro instanceof ErroBase) {

    erro.enviarResposta(res);

  } else {

    new ErroBase().enviarResposta(res);

  }
}