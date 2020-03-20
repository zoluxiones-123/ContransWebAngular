export class ConsultaRefrendoExpoRQT {
  IDUSer: number;
  IDRol: number;
  Booking: string;
  Modalidad: string;
  Estado: number;
}
export class ConsultaRefrendoExpoRPT {
  //public data:any;
  Codigo: string;
  Booking: string;
  Modalidad: string;
  DAM: string;
  NroOrden: string;
  FechaNumeracion: string;
  Estado: string;
  Observacion: string; 
}

export class ConsultaBookingRefrendoExpoRQT {
  IDUSer: number;
  IDRol: number;
  Booking: string;
  Modalidad: string;
  Llenado: boolean;
}
export class ConsultaBookingRefrendoExpoRPT {
  Cod: number;
  Msj: string;
  Codigo: string;
  Booking: string;
  Viaje: string;
  PuerDesc: string;
  PDestino: string;
  TipCarga: string;
  TipoCont: string;
  Exportador: string;
  Mercaderia: string;
  Datos:ConsultaDetalleBookingRefrendoExpoRPT;
}
export class ConsultaDetalleBookingRefrendoExpoRPT {
 public CodContenedor: string;
 public Contenedor: string;
 public Capacidad: string;
 public TipoCont: string;
 public Bultos: number;
 public Peso: number;
 public PctoAduana: string;
}

export class GenerarRefrendoExpoRQT {
  IDUser: number;
  IDRol: number;
  BookLineCodigo: string;
  BookLineNroDoc: string;
  DAM: string;
  Exportador: string;
  NumOrden: string;
  Despachador: string;
  EntiCodAgencia: string;
  AgenciaAduana: string;
  FechaNum: any;
  Mercancia: string;
  EmpaCodigo: string;
  Llenado: boolean;
  //Deta:GenerarDetalleRefrendoExpoRQT;
  Deta: any;
}

export class GenerarDetalleRefrendoExpoRQT {
  public CodContenedor: string;
  public Contenedor: string;
  public Bultos: number;
  public Peso: number;
  public PctoAduana: string;
}
export class GenerarRefrendoExpoRPT {
  Cod: number;
  Msj: string;
}
export class ListaEstadoRefrendoExpo {
  EstadoCodigo: number;
  EstadoDesc: string;
}
export class ListaModalidadRefrendoExpo {
  EmpaCodigo: string;
  EmpaIdentificador: string;
}
