import express from "express";
import LivrosController from "../controllers/LivrosController.js";
import paginar from "../middlewares/paginar.js";

const router = express.Router();

router
  .get("/livros", LivrosController.listarLivros, paginar)
  .get("/livros/busca", LivrosController.listarLivrosPorFiltro)
  .get("/livros/:id", LivrosController.listarLivroPorId)
  .post("/livros", LivrosController.cadastrarLivro)
  .put("/livros/:id", LivrosController.atualizarLivro)
  .delete("/livros/:id", LivrosController.removerLivro);

export default router;
