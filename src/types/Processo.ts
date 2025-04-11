export interface Processo {
  id: number;
  numero: string;
  reclamante: string;
  reclamada: string;
  status: "Ativo" | "Encerrado";
  valorCausa: number;
  depositoJudicial: number;
  depositoRecursal: number;
  valorLevantado: number;
  dataAjuizamento: string;
  cidade: string;
  uf: string;
  vara: string;
}
