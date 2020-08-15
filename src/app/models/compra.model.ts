export interface Compra {
  id?: number;
  vooId: number;
  usuarioId: number;
  created_at?: string;
  updated_at?: string;
  adultos: number;
  criancas: number;
}

export interface CompraSkyscanner {
  id?: number;
  precoVoo: number;
  aeroportoSaida: string;
  aeroportoChegada: string;
  codigoAeroportoSaida: string;
  codigoAeroportoChegada: string;
  dataSaida: Date;
  dataVolta: Date;
  usuarioId: number;
  created_at?: string;
  updated_at?: string;
  adultos: number;
  criancas: number;
}

