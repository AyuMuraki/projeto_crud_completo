import React from "react";

// Define a tipagem esperada pelas props do componente
interface CardTotaisProps {
  totalJudicial: number; // Valor total de depósitos judiciais
  totalRecursal: number; // Valor total de depósitos recursais
  totalLevantado: number; // Valor total já levantado
}

// Componente funcional que recebe os totais como props
const CardTotais: React.FC<CardTotaisProps> = ({
  totalJudicial,
  totalRecursal,
  totalLevantado,
}) => {
  // Função para formatar os valores como moeda brasileira
  const formatarMoeda = (valor: number) => {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  return (
    // Layout com 1 coluna no mobile e 3 colunas em telas maiores (responsive grid)
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      {/* Card 1 - Total Judicial */}
      <div className="bg-white shadow rounded-lg p-4">
        <h3 className="text-gray-500 text-sm">Depósito Judicial</h3>
        <p className="text-2xl font-bold">{formatarMoeda(totalJudicial)}</p>
      </div>

      {/* Card 2 - Total Recursal */}
      <div className="bg-white shadow rounded-lg p-4">
        <h3 className="text-gray-500 text-sm">Depósito Recursal</h3>
        <p className="text-2xl font-bold">{formatarMoeda(totalRecursal)}</p>
      </div>

      {/* Card 3 - Total Levantado */}
      <div className="bg-white shadow rounded-lg p-4">
        <h3 className="text-gray-500 text-sm">Total Levantado</h3>
        <p className="text-2xl font-bold">{formatarMoeda(totalLevantado)}</p>
      </div>
    </div>
  );
};

// Exporta o componente para ser usado em outros arquivos
export default CardTotais;
