// Hooks do React
import { useState, useEffect } from "react";

// Biblioteca para notificações
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// API com funções para manipular os dados dos processos
import api from "./services/api";

// Interface com o tipo Processo
import { Processo } from "./types/Processo";

// Componentes da aplicação
import CardTotais from "./components/CardTotais";
import TabelaProcessos from "./components/TabelaProcessos";
import ModalProcesso from "./components/ModalProcesso";

function App() {
  // Lista de processos carregados da API
  const [processos, setProcessos] = useState<Processo[]>([]);

  // Processo em edição (ou null se for novo)
  const [processoEditando, setProcessoEditando] = useState<Processo | null>(
    null
  );

  // Estado para controle de exibição do modal
  const [modalAberto, setModalAberto] = useState(false);

  // Estado para filtrar os processos por status
  const [filtroStatus, setFiltroStatus] = useState<
    "Todos" | "Ativo" | "Encerrado"
  >("Todos");

  // Função para buscar os processos na API
  const buscarProcessos = async () => {
    try {
      const res = await api.getProcessos();
      setProcessos(res.data); // Atualiza o estado com os dados recebidos
    } catch (error) {
      toast.error("Erro ao carregar processos."); // Mostra erro caso a requisição falhe
    }
  };

  // Executa a busca ao montar o componente (componentDidMount)
  useEffect(() => {
    buscarProcessos();
  }, []);

  // Cálculo dos totais financeiros
  const totais = processos.reduce(
    (acc, processo) => ({
      judicial: acc.judicial + processo.depositoJudicial,
      recursal: acc.recursal + processo.depositoRecursal,
      levantado: acc.levantado + processo.valorLevantado,
    }),
    { judicial: 0, recursal: 0, levantado: 0 } // Valores iniciais
  );

  // Contagem de processos por status
  const quantidadePorStatus = processos.reduce(
    (acc, processo) => {
      if (processo.status === "Ativo") {
        acc.ativos += 1;
      } else if (processo.status === "Encerrado") {
        acc.encerrados += 1;
      }
      return acc;
    },
    { ativos: 0, encerrados: 0 }
  );

  // Filtragem dos processos com base no filtroStatus selecionado
  const processosFiltrados = processos.filter((p) =>
    filtroStatus === "Todos" ? true : p.status === filtroStatus
  );

  return (
    <>
      <div className="container mx-auto p-4">
        {/* Título da página */}
        <h1 className="text-2xl font-bold mb-6">
          Gerenciador de Processos Trabalhistas
        </h1>

        {/* Card com os totais financeiros */}
        <CardTotais
          totalJudicial={totais.judicial}
          totalRecursal={totais.recursal}
          totalLevantado={totais.levantado}
        />

        {/* Card com contagem de processos ativos/encerrados */}
        <div className="mb-6 flex gap-4">
          <div className="bg-white shadow rounded-lg p-4">
            <h3 className="text-gray-500 text-sm">Ativos</h3>
            <p className="text-xl font-bold text-blue-600">
              {quantidadePorStatus.ativos}
            </p>
          </div>
          <div className="bg-white shadow rounded-lg p-4">
            <h3 className="text-gray-500 text-sm">Encerrados</h3>
            <p className="text-xl font-bold text-red-600">
              {quantidadePorStatus.encerrados}
            </p>
          </div>
        </div>

        {/* Botão de cadastrar e seletor de filtro */}
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => {
              setProcessoEditando(null); // Define como novo processo
              setModalAberto(true); // Abre o modal
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Cadastrar Processo
          </button>

          {/* Filtro por status */}
          <div>
            <label className="mr-2 font-medium">Filtrar por status:</label>
            <select
              value={filtroStatus}
              onChange={(e) =>
                setFiltroStatus(
                  e.target.value as "Todos" | "Ativo" | "Encerrado"
                )
              }
              className="border rounded px-2 py-1"
            >
              <option value="Todos">Todos</option>
              <option value="Ativo">Ativo</option>
              <option value="Encerrado">Encerrado</option>
            </select>
          </div>
        </div>

        {/* Tabela com os processos filtrados */}
        <TabelaProcessos
          processos={processosFiltrados}
          onEdit={(processo) => {
            setProcessoEditando(processo); // Define o processo a editar
            setModalAberto(true); // Abre o modal
          }}
          onDelete={async (id) => {
            try {
              await api.deletarProcesso(id); // Remove o processo da API
              toast.success("Processo deletado com sucesso!");
              buscarProcessos(); // Atualiza a lista após deletar
            } catch (error) {
              toast.error("Erro ao deletar processo.");
            }
          }}
        />

        {/* Modal para criar/editar processo */}
        <ModalProcesso
          aberto={modalAberto}
          onClose={() => setModalAberto(false)} // Fecha o modal
          processoEditando={processoEditando} // Envia processo em edição (ou null)
          onSalvar={async (processo: Processo) => {
            try {
              if (processo.id && processoEditando) {
                // Atualiza processo existente
                await api.atualizarProcesso(processo.id, processo);
                toast.success("Processo atualizado com sucesso!");
              } else {
                // Cria um novo processo
                await api.criarProcesso(processo);
                toast.success("Processo criado com sucesso!");
              }
              await buscarProcessos(); // Atualiza lista após salvar
              setModalAberto(false); // Fecha o modal
            } catch (error) {
              toast.error("Erro ao salvar processo.");
            }
          }}
        />
      </div>

      {/* Componente responsável por exibir os toasts */}
      <ToastContainer />
    </>
  );
}

export default App;
