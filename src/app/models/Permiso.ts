
export class BL {
    BL: string;
  }

  export class ContenedorL {
    NroContenedor: string;
  }

  export class DocumentoBL {
    BL: string;
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
    Data: any;
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