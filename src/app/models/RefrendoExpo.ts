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

export class ConsultaIDBookingRefrendoExpoRQT {
  IDUSer: number;
  IDRol: number;
  ID: number;
}

export class ConsultaIDBookingRefrendoExpoRPT {
  CodMsj: number;
  Msj: string;
/*   Data: ConsultaIDDataBookingRefrendoExpoRPT;
  Detalle: ConsultaIDDetalleBookingRefrendoExpoRPT;
  Archivo: ConsultaIDArchivoBookingRefrendoExpoRPT; */
  Data: any;
  Detalle: any;
  Archivo: any;
}
export class ConsultaIDDataBookingRefrendoExpoRPT {
  public Codigo: number;
  public Booking: string;
  public Modalidad: string;
  public DAM: string;
  public NroOrden: string;
  public FechaNumeracion: string;
  public Estado: string;
  public Observacion: string;
  public Canal: string;
  public UsuaCodigo: string;
  public FechCreacion: string;
  public Email: string;
  public RefrendoCod: number;
  public BookLineCodigo: string;
  public BookLineNroDoc: string;
  public Aduana: string;
  public Anio: string;
  public Regimen: string;
  public Exportador: string;
  public NumOrden: string;
  public Despachador: string;
  public EntiCodAgencia: string;
  public AgenciaAduana: string;
  public Mercancia: string;
  public EmpaCodigo: string;
  public llenado: boolean;
  public ObservacionAnulacion: string;
  public CodProducto: string;
  public Producto: string;
  public FechaCutOff: string;
  public FOB: string;
  public MandatoElectronico: boolean;
  public UsuaCodigoAnulado: number;
  public RegistroAnulado: string;
  public Carpeta: string;
}

export class ConsultaIDDetalleBookingRefrendoExpoRPT {
  public RefrendoCodDetalle: number;
  public efrendoCod: number;
  public ContCargCodigo: string;
  public ContDesc: string;
  public Bultos: number;
  public Pesos: number;
  public PctoAduana: string;
  public UsuaCodigo: number;
}

export class ConsultaIDArchivoBookingRefrendoExpoRPT {
  public RefrendoArchCod: number;
  public RefrendoCod: number;
  public RefrendoTipoArcCod: number;
  public Archivo: string;
  public NombreArchivo: string;
  public UsuaCodigo: number;
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

export class GenerarRefrendoExpoActualizarRQT {
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
  Aduana: string;
  Anio: string;
  Regimen: string;
  CodProducto: string;
  Producto: string;
  FechaCutOff: string;
  FOB: string;
  MandatoElectronico: boolean;
  RefrendoCod: number;
  Deta: any;
  ArchivoRefrendo: any;
}

export class GenerarDetalleRefrendoExpoActualizarRQT {
  public CodContenedor: string;
  public Contenedor: string;
  public Bultos: number;
  public Peso: number;
  public PctoAduana: string;
  public RefrendoCodDetalle: number;
}

export class GenerarArchivoRefrendoExpoActualizarRQT {
  public RefrendoTipoArcCod: number;
  public Archivo: string;
  public NombreArchivo: string;
}

export class GenerarRefrendoExpoActualizarRPT {
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

export class Productos {   
      Data: any;
      }
export class Producto {
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

export class ListaDetallePagoCobranzaDetalleRQT {
  IDUSer: number;
  IDRol: number;
  Id: number;
}

export class ListaDetallePagoCobranzaDetalleRPT{
  Liquidacion: number;
  TDoc: string;
  Fecha: string;
  Cliente: string;
  AgAduanas: string;
  UnidadNegocio: string;
  CodUnidadNegocio: string;
  Documento: string;
  Naviera: string;
  NaveViaje: string;
  ListaPrecio: string;
  Estado: string;
  UM: string;
  MonedaAbrev: string;
  Moneda: string;
  TMon: string;
  MCod: string;
  Cantidad: number;
  PrecioUnit: number;
  SubTotal: number;
  Total: number;
  Servicio: string;
  GrupoServicio: string;
}