export interface BusShape {
  RouteUID: string;
  RouteID: string;
  RouteName: NameType;
  SubRouteUID: string;
  SubRouteID: string;
  SubRouteName: NameType;
  Direction: number;
  Geometry: string;
  EncodedPolyline: string;
  UpdateTime: Date;
  VersionID: number;
}

export interface NameType {
  Zh_tw: string;
  En: string;
}
