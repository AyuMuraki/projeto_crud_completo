// Importa a biblioteca axios, que é usada para fazer requisições HTTP
import axios from "axios";

// Importa o tipo Processo para garantir que os dados enviados e recebidos tenham a forma correta
import { Processo } from "../types/Processo";

// Cria uma instância do axios com uma URL base padrão para todas as requisições
const api = axios.create({
  baseURL: "http://localhost:3001", // Aqui está o endereço onde seu JSON Server está rodando
});
export default {
  // Requisição GET para buscar todos os processos
  getProcessos: () => api.get<Processo[]>("/processos"),

  // Requisição POST para criar um novo processo
  criarProcesso: (processo: Processo) => api.post("/processos", processo),

  // Requisição PUT para atualizar um processo já existente pelo ID
  atualizarProcesso: (id: number, processo: Processo) =>
    api.put(`/processos/${id}`, processo),

  // Requisição DELETE para remover um processo pelo ID
  deletarProcesso: (id: number) => api.delete(`/processos/${id}`),
};
