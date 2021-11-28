export interface BusSchedule {
  RouteUID: string;
  RouteID: string;
  RouteName: NameType;
  SubRouteUID: string;
  SubRouteID: string;
  SubRouteName: NameType;
  Direction: number;
  OperatorID: string;
  OperatorCode: string;
  Timetables: BusTimetable[];
  UpdateTime: Date;
  VersionID: number;
}

export interface NameType {
  Zh_tw: string;
  En: string;
}


export interface BusTimetable {
  TripID: string;
  ServiceDay: ServiceDay;
  StopTimes: BusStopTime[];
}

export interface ServiceDay {
  Sunday: number;
  Monday: number;
  Tuesday: number;
  Wednesday: number;
  Thursday: number;
  Friday: number;
  Saturday: number;
  NationalHolidays: number;
}

export interface BusStopTime {
  StopSequence: number;
  StopUID: string;
  StopID: string;
  StopName: NameType;
  ArrivalTime: string;
  DepartureTime: string;
}

