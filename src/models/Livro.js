import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";

const livroSchema = new mongoose.Schema(
  {
    id: {type: String},
    titulo: {type: String, required: true},
    autor: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "autores", 
      required: [true, "O id do autor do livro precisa ser definido na chave 'autor'"],
      autopopulate: true
    },
    editora: {
      type: String, 
      required: [true, "A editora do livro precisa ser definido na chave 'editora'"],
      enum: {
        values:["alura", "casa do código"],
        message: "A editora {VALUE} não é uma editora válida"
      }
    },
    numeroPaginas: {
      type: Number,
      validate: {
        validator: (valor)=>valor>10 && valor<5000,
        message: "O livro precisa ter mais de 10 e menos de 5000 páginas, valor fornecido {VALUE}"
      }
    }
  }
);

livroSchema.plugin(autopopulate);
const livros = mongoose.model("livros", livroSchema);

export default livros;