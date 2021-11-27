export interface BusN1EstimateTime {
  PlateNumb: string;
  StopUID: string;
  StopID: string;
  StopName: NameType;
  RouteUID: string;
  RouteID: string;
  RouteName: NameType;
  SubRouteUID: string;
  SubRouteID: string;
  SubRouteName: NameType;
  Direction: number;
  EstimateTime?: number;
  StopCountDown: number;
  CurrentStop: string;
  DestinationStop: string;
  StopSequence: number;
  StopStatus: number;
  MessageType: number;
  IsLastBus: boolean;
  Estimates?: Estimate;
  DataTime: Date;
  SrcTransTime: Date;
  UpdateTime: Date;
}

export interface NameType {
  Zh_tw: string;
  En: string;
}

export interface Estimate {
  PlateNumb: string;
  EstimateTime: number;
  IsLastBus: boolean;
  VehicleStopStatus: number;
}
