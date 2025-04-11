// Importa o React e o tipo Processo
import React from "react";
import { Processo } from "../types/Processo";

// Define as props que o componente recebe
interface TabelaProcessosProps {
  processos: Processo[]; // Lista de processos a serem exibidos
  onEdit: (processo: Processo) => void; // Função chamada ao clicar em "Editar"
  onDelete: (id: number) => void; // Função chamada ao clicar em "Excluir"
}

// Componente funcional que recebe as props acima
const TabelaProcessos: React.FC<TabelaProcessosProps> = ({
  processos,
  onEdit,
  onDelete,
}) => {
  // Função auxiliar para formatar a data no padrão brasileiro
  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString("pt-BR");
  };

  return (
    <div className="overflow-x-auto">
      {/* Tabela com estilos Tailwind */}
      <table className="w-full border rounded-lg shadow text-sm">
        {/* Cabeçalho da tabela */}
        <thead className="bg-gray-700 text-white">
          <tr>
            <th className="p-3 text-left">Processo</th>
            <th className="p-3 text-left">Reclamante</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Data de Abertura</th>
            <th className="p-3 text-left">Ações</th>
          </tr>
        </thead>

        {/* Corpo da tabela: mapeia cada processo para uma linha */}
        <tbody>
          {processos.map((processo) => (
            <tr
              key={processo.id} // Chave única para cada item
              className="border-b hover:bg-gray-100 even:bg-gray-50"
            >
              <td className="p-3">{processo.numero}</td>
              <td className="p-3">{processo.reclamante}</td>
              <td className="p-3">{processo.status}</td>
              <td className="p-3">{formatarData(processo.dataAjuizamento)}</td>
              <td className="p-3 space-x-2">
                {/* Botão de editar */}
                <button
                  onClick={() => onEdit(processo)}
                  className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Editar
                </button>

                {/* Botão de excluir com confirmação */}
                <button
                  onClick={() => {
                    if (
                      window.confirm(
                        "Tem certeza que deseja excluir este processo?"
                      )
                    ) {
                      onDelete(processo.id);
                    }
                  }}
                  className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Exporta o componente para ser usado em outro lugar
export default TabelaProcessos;
