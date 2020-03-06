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


