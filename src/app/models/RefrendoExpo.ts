export class ConsultaRefrendoExpoRQT {
  IDUSer: number;
  IDRol: number;
  TipoConsulta: string;
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
  Canal: string; 
  UsuaCodigo: string; 
  FechCreacion: string; 
  Email: string; 
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
  FechaCutOff: any;
  CodProducto: string;
  Producto: string;
 // MandatoElectronico: string;/// CONSULTAR
 // ValorFOBmercacia: string;/// CONSULTAR
  Datos:ConsultaDetalleBookingRefrendoExpoRPT;
}
export class ConsultaDetalleBookingRefrendoExpoRPT {
 public CodContenedor: string;
 public Contenedor: string;
 public Capacidad: string;
 public TipoCont: string;
 public Bultos: number;
 public Peso: number;
 public Ticket: string;
 public Precinto: string;
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
  Aduana: string;
  Anio: string;
  Regimen: string;
  CodProducto: string;
  Producto: string;
  FechaCutOff: string;
  FOB: string;
  MandatoElectronico: boolean;

  Deta: any;
  ArchivoRefrendo: any;
}

export class GenerarDetalleRefrendoExpoRQT {
  public CodContenedor: string;
  public Contenedor: string;
  public Bultos: number;
  public Peso: number;
  public PctoAduana: string;
}
export class GenerarArchivoRefrendoExpoRQT {
  public RefrendoTipoArcCod: number;
  public Archivo: string;
  public NombreArchivo: string;
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

export class ListaRegimenRefrendoExpo {
  Codigo: string;
  Descripcion: string;
}


export class Despachadores {   
  Data: any;
  }

export class Despachador {
    Entidad: string;       
    Nombre : string;
  }

export class AgenciaAduanera {   
    Data: any;
    }
  
export class AgenciaAduana {
      Entidad: string;       
      Nombre : string;
    }

export class AnularRefrendoExpoRQT{
  IDUser: number;
  IDRol: number;
  RefrendoCod: number;
  Observacion: string;
  ArchivoRefrendo:any;
}

export class AnularRefrendoExpoArchivoRQT{
  Archivo: string;
  NombreArchivo: string;
}

export class AnularRefrendoExpoRPT{
  Cod: number;
  Msj: string;
}