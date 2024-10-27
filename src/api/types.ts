export type Income = {
  id: string;
  data: Date;
  fonte: string;
  categoria: string;
  valor: number;
  forma_pagamento: string;
  recorrencia: string;
};

export type Expense = {
  id: string;
  data: Date;
  despesa: string;
  descricao: string;
  categoria: string;
  valor: number;
  forma_pagamento: string;
  recorrencia: string;
};

export type Asset = {
  id: string;
  data_aquisicao: Date;
  tipo: string;
  descricao: string;
  valor_estimado: number;
};
