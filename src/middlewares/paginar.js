import ErroDeRequisicaoIncorreta from "../erros/ErroDeRequisicaoIncorreta.js";

export default async function paginar (req, res, next) {
  try{
    let { pagina = 1, limite = 5 , ordenacao = "_id:-1"} = req.query;
    let [ campoOrdenacao, ordem ] = ordenacao.split(":");
    limite = parseInt(limite);
    pagina = parseInt(pagina);
    ordem = parseInt(ordem);

    const resultado = req.resultado;

    if(limite > 0 && pagina > 0){
      const resultadoPaginado = await resultado.find()
        .sort({[campoOrdenacao]: ordem})
        .skip((pagina - 1) * limite)
        .limit(limite)
        .exec();
      res.status(200).json(resultadoPaginado);
    } else {
      next(new ErroDeRequisicaoIncorreta());
    }

  } catch (erro){
    next(erro);
  }
}