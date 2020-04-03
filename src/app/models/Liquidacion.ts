
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

  
  export class ActualizaPrecRPT
  {
    
    Cod: number;
    Msj: string;
  
  }


 