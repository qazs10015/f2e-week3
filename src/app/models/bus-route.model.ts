
export interface BusRoute {
  RouteUID: string;
  RouteID: string;
  HasSubRoutes: boolean;
  Operators: RouteOperator[];
  AuthorityID: string;
  ProviderID: string;
  SubRoutes: BusSubRoute[];
  BusRouteType: number;
  RouteName: NameType;
  DepartureStopNameZh: string;
  DepartureStopNameEn: string;
  DestinationStopNameZh: string;
  DestinationStopNameEn: string;
  TicketPriceDescriptionZh: string;
  TicketPriceDescriptionEn: string;
  FareBufferZoneDescriptionZh: string;
  FareBufferZoneDescriptionEn: string;
  RouteMapImageUrl: string;
  City: string;
  CityCode: string;
  UpdateTime: Date;
  VersionID: number;
}

export interface RouteOperator {
  OperatorID: string;
  OperatorName: NameType;
  OperatorCode: string;
  OperatorNo: string;
}

export interface NameType {
  Zh_tw: string;
  En: string;
}

export interface BusSubRoute {
  SubRouteUID: string;
  SubRouteID: string;
  OperatorIDs: string[];
  SubRouteName: NameType;
  Direction: number;
  FirstBusTime: string;
  LastBusTime: string;
  HolidayFirstBusTime: string;
  HolidayLastBusTime: string;
}
