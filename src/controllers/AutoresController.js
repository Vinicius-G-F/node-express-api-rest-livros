import {autores} from "../models/index.js";
import NaoEncontrado from "../erros/NaoEncontrado.js";

class AutoresController {
  static listarAutores = async (req, res, next)=>{
    try {
      const autoresResultado = autores.find();

      req.resultado = autoresResultado;

      next();
    } catch (erro) {
      next(erro);
    }
  };

  static listarAutorPorId = async (req, res, next)=>{
    try {
      const id = req.params.id;
      const autoresPorId = await autores.findById(id);

      if(autoresPorId != null) {
        res.status(200).send(autoresPorId);
      } else{
        next(new NaoEncontrado("id do autor não localizado"));
      }

    } catch (erro){
      next(erro);
    }
  };

  static cadastrarAutor = async (req, res, next) => {
    let autor = new autores(req.body);
    try {

      const autorCadastrado = await autor.save();
      res.status(201).send(autorCadastrado.toJSON());

    } catch (erro) {
      next(erro);
    }
  };

  static atualizarAutor = async (req, res, next)=>{
    const id = req.params.id;
    try {
      const autorAtualizado = await autores.findByIdAndUpdate(id, {$set: req.body});
      if(autorAtualizado != null) {
        res.status(200).send({message: "Autor atualizado"});
      } else {
        next(new NaoEncontrado("id do autor não localizado"));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static removerAutor = async (req, res, next)=>{
    const id = req.params.id;
    try {
      const autorDeletado = await autores.findByIdAndDelete(id);
      if(autorDeletado != null){
        res.status(200).send({message: "Autor removido"});
      } else {
        next(new NaoEncontrado("id do autor não localizado"));
      }
    } catch (erro) {
      next(erro);
    }
  };
}

export default AutoresController;