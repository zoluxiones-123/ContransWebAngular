export class TemperaturaRQT {
  IDUSer: number;
  IDRol: number;
  Contenedor: string;
}
export class TemperaturaRPT {
  CodMensaje: string;
  Mensaje: string;
  ContCargCodigo: string;
  Contnumero: string;
  BookLineNroDoc: string;
  EntiCodigoEmbarcador: string;
  Embarcador: string;
  EntiCodigoLinea: string;
  Linea: string;
  Nave: string;
  FechaSalida: string;


}
export class TemperaturaDetalleRQT {
  IDUSer: number;
  IDRol: number;
  FechaIni: any;
  FechaFin: any;
  CodContenedor: string;
  BookLineNroDoc: string;
}
export class TemperaturaDetalleRPT {
  public CodMensaje: number;
  public Mensaje: string;
  public ContCargCodigo: string;
  public Contnumero: string;
  public BookLineNroDoc: string;
  public EntiCodigoEmbarcador: string;
  public Embarcador: string;
  public EntiCodigoLinea: string;
  public Linea: string;
  public Nave: string;
  public FechaSalida: string;
  public Data: TemperaturaDataRPT;
  public VD: TemperaturaVDRPT;
}
export class TemperaturaDataRPT {
  public Data: any;
}
export class TemperaturaVDRPT {
  public VD: any;
}
export class CartaTemperaturaRQT {
  IDUser: number;
  IDRol: number;
  EntiCodi: string;
  Kvje: string;
  NBooking: string;
  Emba: string;
  Esta: string;
  Desde: any;
  Hasta: any;
}
export class AnularCerrarCartaTemperaturaRQT {
  Id: string;
  Usuario: string;
}
export class AnularCerrarCartaTemperaturaRPT {
  public Data: any;
  /*     Cod	: number;
      Msj: string; */
}
export class CartaTemperaturaRPT {
  BctId: number;
  KRefOscar: string;
  CodViaje: string;
  NaveViaje: string;
  Producto: string;
  CodEmbarcador: string;
  Embarcador: string;
  CodConsignatario: string;
  Consignatario: string;
  Temp: string;
  TVent: string;
  Vent: string;
  Hume: string;
  O2: string;
  CO2: string;
  Specials: string;
  Ctem: boolean;
  CTreat: boolean;
  CAtmo: boolean;
  FCTemp: any;
  Usuario: string;
  Email: string;
  Estado: string;
  Eta: any;
  EstCamb: number;
}
export class ListaEstado {
  Entidad: string;
  Nombre: string;
}
export class CartaDetalleTemperaturaRQT {
  Usuario: number;
  IdCT: string;
  IDRol: number;
}
export class CartaDetalleTemperaturaRPT {
  //public Data: any;
  Nave: string;
  Viaje: string;
  Booking: string;
  Embarcador: string;
  Consignatario: string;
  PtoEmba: string;
  PtoDescarga: string;
  PtoDestinoFinal: string;
  Producto: string;
  Temp: string;
  Hume: string;
  Vent_CLOSED: string;
  Vent_FULLOPEN: string;
  Vent_CBMHOUR: string;
  CTreat_SI: string;
  CTreat_No: string;
  CAtmo_SI: string;
  CAtmo_No: string;
  EVERFRESH_SI: string;
  EVERFRESH_No: string;
  EVERFRESH_CO2: string;
  EVERFRESH_O2: string;
  STARCOOLCA_SI: string;
  STARCOOLCA_No: string;
  STARCOOLCA_CO2: string;
  STARCOOLCA_O2: string;
  MAXTEND: string;
  TRANSFRESH: string;
  FCTemp: string; 
}
export class CartaDetalleTemperatura2RQT {
  NBooking: string;
}
export class CartaDetalleTemperatura2RPT {
  Contenedor: string;
  Capacidad: string;
  TipoCont: string;
  Puerto: string;
}
export class ActualizarCartaDetalleTemperaturaRQT {
  ID: number;
  temp: string;
  vent: string;
  hume: string;
  O2: string;
  CO2: string;
  specials: string;
  Ctem: boolean;
  CTreat: boolean;
  CAtmo: boolean;
  FCTemp: string;
  dpro: string;
  Usuario: string;
}
export class ActualizarCartaDetalleTemperaturaRPT {
  public Data: any;
}
export class NuevoCartaDetalleTemperaturaRQT {
  Kvje: string;
  NBooking: string;
  Csne: string;
  temp: string;
  vent: string;
  hume: string;
  O2: string;
  CO2: string;
  specials: string;
  Ctem: boolean;
  CTreat: boolean;
  CAtmo: boolean;
  FCTemp: string;
  dpro: string;
  Usuario: string;
}
export class NuevoCartaDetalleTemperaturaRPT {
  public Data: any;
}

export class BuscarCartaDetalleTemperaturaRQT {
  Usuario: number;
  IdCT: string;//Nro Booking
  IDRol: number;
}
export class BuscarCartaDetalleTemperaturaRPT {
  public Data: any;
}
export class BuscarNuevoCartaDetalleTemperaturaRQT {
  NBooking: string;
}
export class BuscarNuevoCartaDetalleTemperaturaRPT {
  public Data: any;
}

