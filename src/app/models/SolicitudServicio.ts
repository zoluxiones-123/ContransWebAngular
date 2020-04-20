  export class ConsultarSolicitudRQT
  {
    IDUser: number;
    IDRol: number;
    HojaServCodigo: string ;
    FechaDesde: any ;
    FechaHasta: any ;
    Volante: string ;
    BlNbr: string;
    BkgNbr: string;
    Estado: string;
  }

  export class ConsultarSolicitudRPT
  {
    CodMsj: number;
    Msj: string;
    data: any;
  }

  export class SolicitudServicio
  {
    HojaServCodigo: string;
    Estado: string;
    FechaCreacion: string;
    FechaPrograma: string;
    FlagAnulacion: string;
    BkgNbr: string;
    Volante: string ;
    BlNbr: string;
    Embarcacion: string;
    ViajeNro: string;
    TareServDescripcion: string;
    HojaServNroDua: string;
    EntiAgente: string;
    EntiConsignatario: string;
    ClienteConsignatario: string;
    EntiSolicita:  string;
    EntiSolicitaWeb: string;
    EntiSolicitaWebTelf: string;
    UsuarioCreador: string;
    EntiCreador: string;
    ClienteCreador: string;
    DEstado: string;
    EntiCodigo: string;
    Contacto: string;
}

export class EstadoSolServicio
{
  Data: any;
}

export class EstSolServicio
{
    EmpaCodigo: string;
    EmpaIdentificador: string;
}

export class ConsultarVolanteSolicitudRQT
{
  IDUser: number;
  IDRol: number;
  Documento: string;
  UnidadNeg: string;
}


export class ImprimirSolicitudRQT
{
  IDUser: number;
  IDRol: number;
  HojaServCodigo: string;
  
}


export class AnularSolServRQT
{
  IDUser: number;
  IDRol: number;
  HojaServCodigo: string;
  Observacion: string;
}


export class AnularSolServRPT
{
  Cod: number;
  Msj: string;
}


export class ImprimirSolicitudRPT
{
  Cod: number;
  Msj: string;
}

export class ConsultarVolanteSolicitudRPT
{
  CodMsj: number;
  Msj: string;
  BLCodigo: string;
  BLNumero: string;
  Manifiesto: string;
  Nave: string;
  Viaje: string;
  Rumbo: string;
  Carga: string;
  CodCarga: string;
  Cliente: string;
  Condicion: string;
  EntiCodigo: string;
  CodCliente: string;
  CodViaje: string;
  data: ConsultarVolanteSolicitudContenedoresRPT;
  serv: ConsultarVolanteSolicitudServiciosRPT;
}

export class ConsultarVolanteSolicitudServiciosRPT
{
  SERVDETACODIGO: string;
  SERVDESCRIPCION: string;
  CONTCAPACODIGO: string;
  ConvDetaOrden: string;
  ServTN: string;
  ServCategoria: string;
  Seleccion: boolean;
}

export class ConsultarVolanteSolicitudServiciosUnicosRPT
{
  SERVDESCRIPCION: string;
  Seleccion: boolean;
}

export class ConsultarVolanteSolicitudContenedoresRPT
{
  CONTCARGCODIGO: string;
  CONTNUMERO: string;
  CONTCAPAIDENTIFICADOR: string;
  CONTTIPO: string;
  PESO: number;
  BULTOS: number;
  Empaque: string;
  Seleccion: boolean;
}

export class ConsultarVolanteSolicitudServiciosContenedoresRPT
{
  ORDEN: number;
  CONTNUMERO: string;
  SERVDESCRIPCION: string;
  Empaque: string;
  BULTOS: number;
  SERVDETACODIGO: string;
  CONTCARGCODIGO: string;
}

export class GenerarSolicitudRQT
{
  IDUser: number;
  IDRol: number;
  RubrCodigo: string;
  HojaServObservacione: string;
  RegiCodigo: string;
  HojaServPrograma: string;
  Documento: string;
  AnioDUA: string;
  RegimenDUA: string;
  DUA: string;
  TareServCodigo: string;
  NombreContacto: string;
  ApellidoContacto: string;
  TelefonoContacto: string;
  Deta:any;
   
}

export class GenerarSolicitudRQTDetalle
{
  CodServicio: string;
  CodContenedor: string;
  Contenedor: string;
}

export class GenerarSolicitudRPT
{
  Cod: number;
  Msj: string;
  CodServicio: string;
}

export class ListaTareaRQT
{
  Index: string;
}

export class ListaTareaRPT
{
  EmpaCodigo: string;
  EmpaIdentificador: string;
}
