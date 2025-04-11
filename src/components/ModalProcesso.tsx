import React, { useState, useEffect } from "react";
import { Processo } from "../types/Processo";
import { toast } from "react-toastify";

// Define as props que o componente espera receber
interface ModalProcessoProps {
  aberto: boolean; // se o modal está visível
  onClose: () => void; // função para fechar o modal
  onSalvar: (processo: Processo) => void; // função para salvar o processo
  processoEditando?: Processo | null; // processo que está sendo editado (opcional)
}

// Componente ModalProcesso
const ModalProcesso: React.FC<ModalProcessoProps> = ({
  aberto,
  onClose,
  onSalvar,
  processoEditando,
}) => {
  // Estado inicial do formulário (usado para criar ou editar)
  const [processo, setProcesso] = useState<Processo>({
    id: 0,
    numero: "",
    reclamante: "",
    reclamada: "",
    status: "Ativo", // valor padrão
    valorCausa: 0,
    depositoJudicial: 0,
    depositoRecursal: 0,
    valorLevantado: 0,
    dataAjuizamento: "",
    cidade: "",
    uf: "",
    vara: "",
  });

  // useEffect para carregar os dados do processo quando for edição
  useEffect(() => {
    if (processoEditando) {
      // Se for edição, preenche o formulário com os dados do processo
      setProcesso(processoEditando);
    } else {
      // Se for novo, reseta os campos
      setProcesso({
        id: 0,
        numero: "",
        reclamante: "",
        reclamada: "",
        status: "Ativo",
        valorCausa: 0,
        depositoJudicial: 0,
        depositoRecursal: 0,
        valorLevantado: 0,
        dataAjuizamento: new Date().toISOString().split("T")[0], // data atual
        cidade: "",
        uf: "",
        vara: "",
      });
    }
  }, [processoEditando]); // Executa sempre que o processoEditando mudar

  // Função genérica para atualizar os campos do formulário
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // Atualiza o estado com o novo valor do campo
    setProcesso((prev) => ({
      ...prev,
      // Converte para número nos campos financeiros
      [name]: [
        "valorCausa",
        "depositoJudicial",
        "depositoRecursal",
        "valorLevantado",
      ].includes(name)
        ? parseFloat(value) || 0
        : value,
    }));
  };

  // Função chamada ao enviar o formulário
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validação simples: campos obrigatórios
    if (!processo.numero || !processo.reclamante || !processo.reclamada) {
      toast.error("Preencha todos os campos obrigatórios!");
      return;
    }

    // Chama a função de salvar recebida via props
    onSalvar(processo);
  };

  // Se o modal não estiver aberto, não renderiza nada
  if (!aberto) return null;

  return (
    <div className="fixed inset-0 bg-white/10 backdrop-blur-md flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl mx-4 p-6 max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          {processoEditando ? "Editar Processo" : "Novo Processo"}
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Linha 1: Dados principais */}
          <div className="grid grid-cols-4 gap-4 mb-4">
            {/* Número do processo */}
            <div>
              <label className="block text-sm text-gray-600 font-medium">
                Número do Processo*
              </label>
              <input
                type="text"
                name="numero"
                value={processo.numero}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            {/* Reclamante */}
            <div>
              <label className="block text-sm text-gray-600 font-medium">
                Reclamante*
              </label>
              <input
                type="text"
                name="reclamante"
                value={processo.reclamante}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full shadow-sm"
                required
              />
            </div>

            {/* Reclamada */}
            <div>
              <label className="block text-sm text-gray-600 font-medium">
                Reclamada*
              </label>
              <input
                type="text"
                name="reclamada"
                value={processo.reclamada}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full shadow-sm"
                required
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm text-gray-600 font-medium">
                Status
              </label>
              <select
                name="status"
                value={processo.status}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full shadow-sm"
              >
                <option value="Ativo">Ativo</option>
                <option value="Encerrado">Encerrado</option>
              </select>
            </div>
          </div>

          {/* Linha 2: Valores financeiros */}
          <div className="grid grid-cols-4 gap-4 mb-4">
            {/* Cada campo formata o valor como moeda brasileira e converte corretamente ao digitar */}

            {/* Valor da causa */}
            <div>
              <label className="block text-sm text-gray-600 font-medium">
                Valor da Causa (R$)
              </label>
              <input
                type="text"
                name="valorCausa"
                value={processo.valorCausa.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
                onChange={(e) =>
                  setProcesso((prev) => ({
                    ...prev,
                    valorCausa:
                      parseFloat(
                        e.target.value.replace(/[R$\s.]/g, "").replace(",", ".")
                      ) || 0,
                  }))
                }
                className="mt-1 p-2 border border-gray-300 rounded-md w-full shadow-sm"
              />
            </div>

            {/* Depósito Judicial */}
            <div>
              <label className="block text-sm text-gray-600 font-medium">
                Depósito Judicial (R$)
              </label>
              <input
                type="text"
                name="depositoJudicial"
                value={processo.depositoJudicial.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
                onChange={(e) =>
                  setProcesso((prev) => ({
                    ...prev,
                    depositoJudicial:
                      parseFloat(
                        e.target.value.replace(/[R$\s.]/g, "").replace(",", ".")
                      ) || 0,
                  }))
                }
                className="mt-1 p-2 border border-gray-300 rounded-md w-full shadow-sm"
              />
            </div>

            {/* Depósito Recursal */}
            <div>
              <label className="block text-sm text-gray-600 font-medium">
                Depósito Recursal (R$)
              </label>
              <input
                type="text"
                name="depositoRecursal"
                value={processo.depositoRecursal.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
                onChange={(e) =>
                  setProcesso((prev) => ({
                    ...prev,
                    depositoRecursal:
                      parseFloat(
                        e.target.value.replace(/[R$\s.]/g, "").replace(",", ".")
                      ) || 0,
                  }))
                }
                className="mt-1 p-2 border border-gray-300 rounded-md w-full shadow-sm"
              />
            </div>

            {/* Valor Levantado */}
            <div>
              <label className="block text-sm text-gray-600 font-medium">
                Valor Levantado (R$)
              </label>
              <input
                type="text"
                name="valorLevantado"
                value={processo.valorLevantado.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
                onChange={(e) =>
                  setProcesso((prev) => ({
                    ...prev,
                    valorLevantado:
                      parseFloat(
                        e.target.value.replace(/[R$\s.]/g, "").replace(",", ".")
                      ) || 0,
                  }))
                }
                className="mt-1 p-2 border border-gray-300 rounded-md w-full shadow-sm"
              />
            </div>
          </div>

          {/* Linha 3: Local e data */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            {/* Data */}
            <div>
              <label className="block text-sm text-gray-600 font-medium">
                Data de Ajuizamento
              </label>
              <input
                type="date"
                name="dataAjuizamento"
                value={processo.dataAjuizamento}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full shadow-sm"
              />
            </div>

            {/* Cidade */}
            <div>
              <label className="block text-sm text-gray-600 font-medium">
                Cidade
              </label>
              <input
                type="text"
                name="cidade"
                value={processo.cidade}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full shadow-sm"
              />
            </div>

            {/* UF */}
            <div>
              <label className="block text-sm text-gray-600 font-medium">
                UF
              </label>
              <input
                type="text"
                name="uf"
                maxLength={2}
                value={processo.uf}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full shadow-sm"
              />
            </div>

            {/* Vara */}
            <div>
              <label className="block text-sm text-gray-600 font-medium">
                Vara
              </label>
              <input
                type="text"
                name="vara"
                value={processo.vara}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full shadow-sm"
              />
            </div>
          </div>

          {/* Botões de ação */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalProcesso;
