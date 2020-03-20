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
}

