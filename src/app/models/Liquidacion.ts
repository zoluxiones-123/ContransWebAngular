
export class AutEntregaPrecRQT {   
    IDUser: number;
    IDRol: number;
    UnidadNegocio: string;
    Documento: string;
    Persona: string;
  }
    
export class AutEntregaPrecRPT {   
    CodMsj: number;
    Msj: string;
    data: any;
}

   
export class AutEntregaPrec{   
    LiquCodigo: number;
    RegiCodigo: string;
    NombreCompleto: string;
    DNI: string;
    EmpresaPertenece: string;
}

export class LiquidacionBRQT{   
  IDUser: number;
  IDRol: number;
  UnidNegoCodigo: string;
  Tipo: string;
  Documento: string;
  Contenedor: string;
}

export class LiquidacionBRPT{   
    CodMsj: number;
    Msj: string;
    RegiCodigo: string;
    Documento: string;
    Cliente: string;
    NaveViaje: string;
    LineaNaviera: string;
    Notificador: string;
    Terminal: string;
    EntiCodigo: string;
    Volante: string;
    EntiCodigoAgAduanas: string;
    AgenteAduanas: string;
    Termcodempty: string;
    data: any;
  }

  export class LiquidacionCont{   
    ContCargCodigo: string;
    ContNumero: string;
    ContCapaIdentificador: string;
    ContTipoIdentificador: string;
    Liquidacion: boolean;
    CantProgramado: number;
    CantLiquidado: number;
    CantDisponible: number;
    Cantidad: number;
  }

  export class LiquidacionCliente{   
    RegiCodigo: string;
    Documento: string;
    Cliente: string;
    NaveViaje: string;
    LineaNaviera: string;
    Notificador: string;
    Terminal: string;
    EntiCodigo: string;
    Volante: string;
    EntiCodigoAgAduanas: string;
    AgenteAduanas: string;
    Termcodempty: string;
  }

  export class ValidaEdiPrecRQT
  {
    
      IDUser: number;
      IDRol: number;
      CodLiqu: number;
      NombreCompleto: string;
      DNI: string;
      EmpresaPertenece: string ;
  
  }

  export class ValidaEdiPrecRPT
  {
    
    Cod: number;
    Msj: string;
  
  }

  
  export class ValidaFacturarARQT
  {
    
      IDUser: number;
      IDRol: number; 
      FacturarACod: string;
      FacturarA: string;
    
  }

  export class ValidaFacturarARPT
  {
    
    Cod: number;
    Msj: string;
    
  }

  export class ValidarTerceroRQT
  {
    
      IDUser: number;
      IDRol: number; 
      EntidadCod:  string;
      UnidNegoCodigo: string;
      FacturarACod: string;    
  }

  
  export class ValidarTerceroRPT
  {
    
    Cod: number;
    Msj: string;
    
  }

  
  export class ActualizaPrecRQT
  {
    
      IDUser: number;
      IDRol: number;
      CodLiqu: number;
      NombreCompleto: string;
      DNI: string;
      EmpresaPertenece: string ;
  
  }

  
  export class ClienteTransConsRQT
  {
    
      IDUser: number;
      IDRol: number;
      EntiCodigoCliente: string;
      IdTransportistaNavis: string;
      Documento: string;
  
  }

  
  export class ClienteTransConsRPT {   
  CodMsj: number;
  Msj: string;
  Data: any;
  }

  
  export class ClienteTrans {
  IdClienteTransportista: number;
  Cliente: string;
  Transportista: string;
  EntiCodigoCliente: string;
  Documento: string;
  Estado: string;
  }

  
  export class ActualizaPrecRPT
  {
    
    Cod: number;
    Msj: string;
  
  }

  
  export class RegClienteTransRQT {
    IDUser: number;
    IDRol: number;
    EntiCodigoCliente: string ;
    IdTransportistaNavis: string;
    Documento: string;

    }

    
  export class RegClienteTransRPT {
  
    Cod: number;
    Msj: string;

    }

    

    
  export class MensajeRQT {
  
    Codigo: number;
  
    }
    
  export class MensajeRPT {
    
    Cod: number;
    Msj: string;
  }

  
  export class VisualizarLiqRQT{   
    IDUser: number;
    IDRol: number;
    Codigo: number;
    Accion: string;
    TipoOperacion: string;
    CodigoUnidadNegocio: string;
    Extranet: number;
    Registro: string;
    FechaLiquidacion: string;
    Facturar_A: string;
    NombreCompleto: string;
    TipoDoc: string;
    EmpresaPertenece: string
    Cantidad: number;
    CodigoEntidadLista: string;
    Fecha: string;
    Usuario: string;
    CodigoEntidadAgencia: string;
    TipoEntiRecojoPrecinto: string;
  }

  
  export class VisualizarLiqRPT{   
    CodMsj: number;
    Msj: string;
    Liquidacion: number;
    data : any;

  }

  
  export class VisLiquidacion{   
            int_LiquDetaId: number;
            bit_LiquDetaFacturado: boolean;
            chr_ServCodigo: string;
            vch_LiquDetaDescripcion: string;
            chr_HojaServCodigo: string;
            bit_LiquDetaPublico: boolean;
            num_LiquDetaCantidad: number;
            vch_UnidMediDescripcion: string;
            chr_MoneCodigo: string;
            vch_MoneAbreviado: string;
            vch_MoneDescripcion: string;
            num_LiquDetaPrecio: number;
            num_LiquDetaDescuento: number;
            num_LiquDetaMonto: number;
            num_LiquDetaTotal: number;
            num_LiquDetaImpuesto: number;
            num_LiquDetaNeto: number;
            int_LiquDetaLinea: string;
            bit_EstaAnulado: boolean;
    
  }

  
  
  export class RegLiquidacionRQT{   
    IDUser: number;
    IDRol: number;
    Codigo: number;
    Accion: string;
    TipoOperacion: string;
    CodigoUnidadNegocio: string;
    Extranet: number;
    Registro: string;
    FechaLiquidacion: string;
    Facturar_A: string;
    NombreCompleto: string;
    TipoDoc: string;
    EmpresaPertenece: string;
    Cantidad: number;
    CodigoEntidadLista: string;
    Fecha: string;
    Usuario: string;
    CodigoEntidadAgencia: string;
    TipoEntiRecojoPrecinto: string;
    MoneCodigo: string;
    LiquFactSubTotal: number;
    LiquFactImpuesto: number;
    LiquFactTotal: number;
    UsuarioSAP: string;
    CodigoTipoVenta: string;
    CodigoDocumento: string;
    CodigoSerie: string;
    SerieDocumento: string;
    CarpetaOC: string;
    Referencia: string;
    CodigoFactura: number;
  }

  export class RegLiquidacionRPT{   
    CodMsj: number;
    Msj: string;
    Liquidacion: number;
    data: any;
}
 