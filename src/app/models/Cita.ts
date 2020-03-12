export class CitasRQT {
    Token: string;
    IDRol: number;
    TCarga: string;
    Almacen: string;
    NroCita: string;
    Documento: string;
    Registro: string;
    Permiso: string;
    Desde: any;
    Hasta: any;
  }

  export class CitasRPT {
    Cita:  string ;
    FPrograma:  string ;
    Documento:  string ;
    Contenedor:  string ;
    Cliente:  string ;
    Registro:  string ;
    NroPermiso:  string ;
    Agente:  string ;
    UCreado:  string ;
    FRegistro:  string ;
    UModificado:  string ;
    FModificado:  string ;
    CodigoBarra:  string ;
    CodigoBarraPer:  string ;
    CodigoQR:  string ;
    VehiPlaca:  string ;
    NroBrevete:  string ;
    FechaPermiso:  string ;
    Almacen:  string ;
    DAM:  string ;
    Bulto:  string ;
    Peso:  string ;
    Extemporaneo:  string ;
    Extraordinario:  string ;
    TipoCon:  string ;
    Linea:  string ;
    Trasegado:  string ;
    TipoCitaCodigo:  string ;
    Memo:  string ;
    Msj:  string ;
    Email:  string ;
    Obs:  string ;
  }

  export class Citas {
      Data: any;
  }

  export class TokenCitaRQT {
    Token:  string;
    IDRol: number;
    Tipo: string;
    Descripcion : string;
    Operacion : string;
    Cita: string;
}


export class TokenCitaRPT {
   
  Cod : number; 
  Msj : string; 

}


export class ActCitaRQT {
  Token: string;
  IDRol: number;
  HojaservCodigo: string;
  Placa : string;
  Brevete : string;
  
}


export class ActCitaRPT {
   
  Cod : number; 
  Msj : string; 

}


export class ImpriCitaRQT {

  Token: string;
  IDRol: number;
  TCarga:  string;
  Almacen: string;
  NroCita:  string ;
  Documento:  string;
  Registro:  string;
  Permiso:  string;
  Desde:  string;
  Hasta:  string;
  
}

export class ImpriCitaRPT {
Data : any;
}




export class ValidarTokenCitaRQT {
  Token:  string;
  IDRol: number;
  Operacion: string;
  Cita: string;
  TokenCita: string;
 

}


export class ValidarTokenCitaRPT {
   
  Cod : number; 
  Msj : string; 

}


export class ActTokenCitaRQT {
  Token:  string;
  IDRol: number;
  TokenCita: string; 

}



export class ActTokenCitaRPT {
  Cod : number; 
  Msj : string; 

}


export class AnularCitaRQT {
  Token: string;
  IDRol: number;
  HojaservCodigo: string;
  Motivo : string;
  
}

export class AnularCitaRPT {
  Cod : number; 
  Msj : string; 

}


export class CitaPermisoRQT {
  Token: string;
  IDRol: number;
  TCarga: string; 
  Almacen: string;
  Registro: string;
  Trasegado : boolean;
  TipoCita : string;
}



export class CitaPermisoRPT {
      Error: number;
      ErrorMsg: string;
      PermCodigo: string;
      PermFecha: string;
      CantContenedores: number;
      BL: string;
      FechActu: string;
      DUA: string;
      Regimen: string;
      Manifiesto: string;
  }

  export class CitaLContenedorRQT
  {
    Token: string;
    IDRol: number;
    TCarga: string;
    Almacen: string;
    Permiso: string;
    Trasegado: boolean;
  }

  export class CitaLContenedorRPT
  {
    CodiContenedor: string;
    Contenedor: string;
    DesCTNR: string;
    Estado: string;
    PermDetaCodigo: string;
    Registro: string;
    FechaProg: string;
    IntegralContrans: string;
    AutBulto: number;
    AutPeso: number;
    Serie: string;
    CuotaPeso: number;
    CuotaBulto: number;
  }

  export class CitasContenedor
  {
    Error: number;
    ErrorMsg: string;
    Data: any;
  }



export class CitasPermiso {
  Data : any;
  }

  
  export class CitasCFechaRQT
  {
    Token: string;
    IDRol: number;  
  }

  
  export class CitasCFechaRPT
  {
    ErrMsg: string;
    Proceso: number;
    Dia: number;
    DiasRepetecion: number;
    FInicio: string;
    FTermino: string;
    Cantidad: number;
  }

  
  export class CitasCHorasRQT
  {
    Token: string;
    IDRol: number;  
    Fecha: string;
    Registro: string;
    TipoCarga: string;
    Almacen: string;
  }

  
  
  
  


