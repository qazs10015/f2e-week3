export interface BusA1Data {
  PlateNumb: string;
  OperatorID: string;
  RouteUID: string;
  RouteID: string;
  RouteName: RouteName;
  SubRouteUID: string;
  SubRouteID: string;
  SubRouteName: RouteName;
  Direction: number;
  BusPosition: BusPosition;
  Speed: number;
  Azimuth: number;
  DutyStatus: number;
  BusStatus: number;
  MessageType: number;
  GPSTime: Date;
  SrcRecTime: Date;
  SrcTransTime: Date;
  UpdateTime: Date;
}

export interface BusPosition {
  PositionLon: number;
  PositionLat: number;
  GeoHash: string;
}

export interface RouteName {
  Zh_tw: string;
  En: string;
}
