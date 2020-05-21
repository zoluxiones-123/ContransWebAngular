
export class BL {
    BL: string;
  }

  export class ContenedorL {
    NroContenedor: string;
  }

  export class DocumentoBL {
    BL: string;
  }

  export class FormatoExcel {
    data: any;
  }

  
  export class PermisoListarRQT {
    IDUser: number;
    IDRol: number
    CodigoSolicitud: number;    
  }

  
  export class Permiso {
    Permiso: string;
    Registo: string;
    Documento: string;
    FechaCreacion: string;
  }

  
  export class PermisoImprimirRQT {
    IDUser: number;
    IDRol: number;
    Permiso: string;    
  }
  
  export class PermisoImprimirRPT {
    Cod: number;
    Msj: string;
    Data: any;
  }


  
  export class PermisoListarRPT {
    Data:any;
  }

  
  export class ObservacionPer {
  CodHelp: number;
  Codigo: number;
  CodTipoObervacion: number;
  TipoObervacion: string;
  Observacion: string;
  RegistroCreado: string;
  }

  
  export class RegistrarObsPagoRQT {
    IDUser: number;
    IDRol: number;
    SolicitudPermiso: number;
    Observacion: string;
    Data: any;
    }

    
  export class RegistrarObsPagoRPT {
    Cod: number;
    Msj: string;
    }

  export class SolPerArchivoRQT {
    IDUser: number;
    IDRol: number;
    Codigo: number;
    CodHelp: number;
  }

  
  export class SolPerArchivoRPT {
    Cod: number;
    Msj: string;
    Data: any;
  }


  export class ConsultaLevanteRQT {     
  IDUser: number;
  IDRol: number;
  CodigoOperador: string;
  CodigoAduana: string;
  Anio: string;
  Regimen: string;
  DAM: string;
  FacturarA: string;
  Data: any;
  }

  
  export class ConsultaSolPerEstRQT{     
    IDUser: number;
    IDRol: number;
    SolicitudPermiso: number;
    }

    
  export class ConsultaSolPerEstRPT{     
    CodMsj: number;
    Mensaje: string;
    CodigoEstado: number;
    DataObservaciones: any;
    DataLiquidacion: any;
    }

    export class LiquidacionPer{     
      CodHelp: number;
      SolicitudPermisoLiquidacionDeta: number;
      Bl: string;
      Liquidacion: string;
      Moneda: string;
      Monto: number;
      Observacion: string;
      }
  

  
  export class ConsultaLevanteMasivoRQT {     
    IDUser: number;
    IDRol: number;
    FacturarA: string;
    Data: any;
    }
  
    export class ConsultaLevanteMasivoRPT {     
      CodAleatorio: string;
      DAM: any;
      Documentos : any;
      Contenedores : any;
      }
    
  
  export class RegistrarSolPermisoRQT {     
    IDUser: number;
    IDRol: number;
    CodAleatorio: string;
    FacturarA: string;
    FOB: number;
    Archivos: any;
    }

    
  export class DAM {     
    BL: string;
    CodigoAduana: string;
    Regimen: string;
    Anio: string;
    DAM: string;
    FOB: string;
    }

    
  export class RegistrarSolPermisoRPT {     
    Cod: number;
    Msj: string;
    }

  export class Archivo {     
    Archivo: string;
    NombreArchivo: string;
      }
  

  
export class EstadoSolPermiso
{
  Data: any;
}
      
  export class ConsultaLevanteRPT {   
    CodMsj: number;
    Mensaje: string;
    Codigo: string;
    CodigoAduanaDeclaracion: string;
    AduanaDeclaracion: string;
    AnioDeclaracion: string;
    CodRegimen: string;
    Regimen: string;
    NroDeclaracion: string;
    FechaDeclaracion: string;
    CodigoModalidaDespacho: string;
    ModalidaDespacho: string;
    CodigoEntidadImportador: string;
    CodigoClientImportador: string;
    RazonSocialImportador: string;
    RucImportador: string;
    FechaSalidaAlmacen: string;
    CodigoEntidadAgenteAduana: string;
    CodigoClientAgenteAduana: string;
    RazonSocialAgenteAduana: string;
    RucAgenteAduana: string;
    CantidadBultos: number;
    PesoBruto: number;
    FechaLevante: string;
    CodigoEntidadPuntoLlegada: string;
    CodigoClientPuntoLlegada: string;
    RazonSocialPuntoLlegada: string;
    RucPuntoLlegada: string;
    CodViaTransporte: string;
    ViaTransporte: string;
    CodAduanaManifiesto: string;
    AnioManifiesto: string;
    NumManifiesto: string;
    CodCanal: string;
    Canal: string;
    CodigoACE: string;
    ACE: string;
    COdigoRestringidoSENASA: string;
    RestringidoSENASA: string;
    FechaFinProceso: string;
    CodAleatorio: string;
    Data: any;
}

     
export class DAMMasivo {   
  CodMsj: number;
  Mensaje: string;
  Codigo: string;
  CodigoAduanaDeclaracion: string;
  AduanaDeclaracion: string;
  AnioDeclaracion: string;
  CodRegimen: string;
  Regimen: string;
  NroDeclaracion: string;
  FechaDeclaracion: string;
  CodigoModalidaDespacho: string;
  ModalidaDespacho: string;
  CodigoEntidadImportador: string;
  CodigoClientImportador: string;
  RazonSocialImportador: string;
  RucImportador: string;
  FechaSalidaAlmacen: string;
  CodigoEntidadAgenteAduana: string;
  CodigoClientAgenteAduana: string;
  RazonSocialAgenteAduana: string;
  RucAgenteAduana: string;
  CantidadBultos: number;
  PesoBruto: number;
  FechaLevante: string;
  CodigoEntidadPuntoLlegada: string;
  CodigoClientPuntoLlegada: string;
  RazonSocialPuntoLlegada: string;
  RucPuntoLlegada: string;
  CodViaTransporte: string;
  ViaTransporte: string;
  CodAduanaManifiesto: string;
  AnioManifiesto: string;
  NumManifiesto: string;
  CodCanal: string;
  Canal: string;
  CodigoACE: string;
  ACE: string;
  COdigoRestringidoSENASA: string;
  RestringidoSENASA: string;
  FechaFinProceso: string;
}



export class Documento 
{
  CodDocumentoTransporte: string;
  NroDocumentoTransporte: string;
  Cantidad: number;
  Peso: number
}


export class Contenedor 
{
  CodDocumentoTransporte: string;
  CodContenedor: string;
  NroContenedor: string;
}


export class DetConsLevante 
{
  FechaTerminoDescarga: string;
  Documentos: any ;  
  Contenedores: any ;
}


export class ConsultaSolPermisoRQT
{
  IDUser: number;
  IDRol: number;
  Codigo: number;
  Estado: number;
  Bl: string;
  Anio: string;
  Dam: string;
  Desde: any;
  Hasta: any;
}

export class ConsultaSolPermisoRPT
{
  Data: any;
}

export class SolicitudPermiso{
CodMjs: number;
MSJ: string;
Codigo: number;
Registro: string;
BL: string;
NroDeclaracion: string;
FechaDeclaracion: string;
ModalidadDespacho: string;
Importador: string;
FechaSalidaAlmacen: string;
AgenteAduana: string;
Bultos: number;
Peso: number;
FechaLevante: string;
Via: string;
Manifiesto: string;
Canal: string;
ACE: string;
SENASA: string;
FechaFinProceso: string;
Estado: string;
RegistradoPor: string;
FechaDeRegistro: string;
AnuladoPor: string;
FechaDeAnulacion: string;
Observación: string;
CodFacturarA: string;
FacturarA: string;
Responsable: string;
FechaResponsabe: string;

}
