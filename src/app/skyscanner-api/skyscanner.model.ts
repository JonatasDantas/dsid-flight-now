interface CarriersRaw {
  CarrierId: number;
  Name: string;
}

export interface CurrenciesRaw {
  Code: string;
  Symbol: string;
  ThousandsSeparator: string;
  DecimalSeparator: string;
  SymbolOnLeft: boolean;
  SpaceBetweenAmountAndSymbol: boolean;
  RoundingCoefficient: number;
  DecimalDigits: number;
}

export interface LegRaw {
  CarrierIds: number[];
  OriginId: number;
  DestinationId: number;
  DepartureDate: string;
}

export interface PlacesRaw {
  PlaceId: number;
  IataCode: string;
  Name: string;
  Type: string;
  SkyscannerCode: string;
  CityName: string;
  CityId: string;
  CountryName: string;
}

export interface PlacesListRaw {
  PlaceId: number;
  PlaceName: string;
  CityId: string;
  CountryName: string;
}

export interface QuotesRaw {
  QuoteId: number;
  MinPrice: number;
  Direct: boolean;
  OutboundLeg: LegRaw;
  InboundLeg?: LegRaw;
  QuoteDateTime: string;
}

export interface IGetCotacoesRaw {
  Quotes: QuotesRaw[];
  Places: PlacesRaw[];
  Carriers: CarriersRaw[];
  Currencies: CurrenciesRaw[];
}

export interface DadosVoo {
  aeroportoSaida: string;
  aeroportoChegada: string;    
  codigoAeroportoSaida: string;
  codigoAeroportoChegada: string;
  cidadeSaida: string;
  cidadeChegada: string;
  dataSaida: Date;
}

export class Cotacao {

  precoAdulto: number;
  precoMeia: number;
  ida: DadosVoo;
  volta?: DadosVoo;
  companhiaAerea: string;
  soIda: boolean;
  
  static fromRaw(rawResponse: IGetCotacoesRaw) {
    return rawResponse.Quotes.map(e => {
      const cotacao = new Cotacao()
      cotacao.companhiaAerea = Cotacao.getCompanhiaAereaPorId(e.OutboundLeg.CarrierIds[0], rawResponse.Carriers)
      cotacao.precoAdulto = e.MinPrice;
      cotacao.precoMeia = cotacao.precoAdulto / 2;
      cotacao.ida = Cotacao.getIdaAtributos(e, rawResponse);
      cotacao.volta = Cotacao.getVoltaAtributos(e, rawResponse);
      if (!cotacao.volta) {
        cotacao.soIda = true;
      }
      cotacao.soIda = false;
      return cotacao;
    })
  }

  private static getIdaAtributos(e: QuotesRaw, rawResponse: IGetCotacoesRaw) {
    return {
      aeroportoSaida: Cotacao.getAeroportoPorId(e.OutboundLeg.OriginId, rawResponse.Places).Name,
      codigoAeroportoSaida: Cotacao.getAeroportoPorId(e.OutboundLeg.OriginId, rawResponse.Places).IataCode,

      aeroportoChegada: Cotacao.getAeroportoPorId(e.OutboundLeg.DestinationId, rawResponse.Places).Name,
      codigoAeroportoChegada: Cotacao.getAeroportoPorId(e.OutboundLeg.DestinationId, rawResponse.Places).IataCode,

      cidadeSaida: Cotacao.getAeroportoPorId(e.OutboundLeg.OriginId, rawResponse.Places).CityName,
      cidadeChegada: Cotacao.getAeroportoPorId(e.OutboundLeg.DestinationId, rawResponse.Places).CityName,

      dataSaida: Cotacao.getDateObject(e.OutboundLeg.DepartureDate)
    };
  }

  private static getVoltaAtributos(e: QuotesRaw, rawResponse: IGetCotacoesRaw) {
    if (!e.InboundLeg) return;
    return {
      aeroportoSaida: Cotacao.getAeroportoPorId(e.InboundLeg.OriginId, rawResponse.Places).Name,
      codigoAeroportoSaida: Cotacao.getAeroportoPorId(e.InboundLeg.OriginId, rawResponse.Places).IataCode,

      aeroportoChegada: Cotacao.getAeroportoPorId(e.InboundLeg.DestinationId, rawResponse.Places).Name,
      codigoAeroportoChegada: Cotacao.getAeroportoPorId(e.InboundLeg.DestinationId, rawResponse.Places).IataCode,

      cidadeSaida: Cotacao.getAeroportoPorId(e.InboundLeg.DestinationId, rawResponse.Places).CityName,
      cidadeChegada: Cotacao.getAeroportoPorId(e.InboundLeg.DestinationId, rawResponse.Places).CityName,

      dataSaida: Cotacao.getDateObject(e.InboundLeg.DepartureDate)
    };
  }

  static getDateObject(date: string) {
    return new Date(...date.split('-').map(e => parseInt(e)) as [number, number, number])
  }

  static getAeroportoPorId(id?: number, aeroportoList?: PlacesRaw[]) {
    if (!id || !aeroportoList) return;
    return aeroportoList.find(e => e.PlaceId === id)
  }

  static getCompanhiaAereaPorId(id?: number, companhiaAereaList?: CarriersRaw[]) {
    if (!id || !companhiaAereaList) return;
    return companhiaAereaList.find(e => e.CarrierId === id).Name
  }
  
}

