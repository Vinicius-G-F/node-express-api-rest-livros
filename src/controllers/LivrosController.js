import NaoEncontrado from "../erros/NaoEncontrado.js";
import {autores, livros} from "../models/index.js";

class LivrosController {
  static listarLivros = async (req, res, next)=>{
    try {
      const buscarLivros = livros.find();

      req.resultado = buscarLivros;

      next();
      
    } catch (erro) {
      next(erro);
    }
  };

  static listarLivroPorId = async (req, res, next)=>{
    const id = req.params.id;
    try {
      const livroPorId = await livros.findById(id, {}, {autopopulate: false});
      if(livroPorId != null){
        res.status(200).json(livroPorId);
      } else {
        next(new NaoEncontrado("id do livro não localizado"));
      }
    } catch (erro){
      next(erro);
    }
  };

  static cadastrarLivro = async (req, res, next) => {
    let livro = new livros(req.body);
    try {
      await livro.save();
      res.status(201).send(livro.toJSON());
    } catch (erro) {
      next(erro);
    }
  };

  static atualizarLivro = async (req, res, next)=>{
    const id = req.params.id;
    try {
      const livroAtualizado = await livros.findByIdAndUpdate(id, {$set: req.body});
      if(livroAtualizado != null){
        res.status(200).send({message: "Livro atualizado"});
      } else {
        next(new NaoEncontrado("id do livro não localizado"));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static removerLivro = async (req, res, next)=>{
    const id = req.params.id;
    try {
      const livroRemovido = await livros.findByIdAndDelete(id);
      if(livroRemovido != null) {
        res.status(200).send({message: "Livro removido"});
      } else {
        next(new NaoEncontrado("id do livro não localizado"));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static listarLivrosPorFiltro = async (req, res, next)=>{
    try {
      const busca = await processaBusca(req.query);
      if(busca !== null){
        const livrosPorFiltro = livros
          .find(busca);
        
        req.resultado = livrosPorFiltro;

        next();
      } else {
        res.status(200).send([]);
      }

    } catch (erro) {
      next(erro);
    }
  };
}

async function processaBusca (campoBusca){
  const {editora, titulo, minPaginas, maxPaginas, nomeAutor } = campoBusca;

  let busca = {};

  if ( editora ) busca.editora = editora;
  if ( titulo ) busca.titulo = {$regex: titulo, $options: "i"};

  if ( minPaginas || maxPaginas) busca.numeroPaginas = {};

  if ( minPaginas ) busca.numeroPaginas.$gte = minPaginas;
  if ( maxPaginas ) busca.numeroPaginas.$lte = maxPaginas;

  if( nomeAutor ) {
    const autor = await autores.findOne({nome: nomeAutor});
    if(autor != null){
      busca.autor = autor._id;
    } else {
      busca = null;
    }

  }

  return busca;
}

export default LivrosController;