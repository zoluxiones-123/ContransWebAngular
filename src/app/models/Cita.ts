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

  export class CitasCHorasRPT
  {
    RetiCuotCodigo: number;
    RetiCuotHora: number;
    HoraProg: string;
    CantidadDisponible: number;
  }

  
  export class CitaVacioAsig
  {
    Contenedor: number;
    TipoCont: string;
    Placa: string;
    Brevete: string;
    constructor(cont:number,tipcont:string, placa:string, brevet : string)
    {
        this.Contenedor = cont;
        this.TipoCont = tipcont;
        this.Placa = placa;
        this.Brevete =  brevet;
    }
  }

  
  export class CitaVacioDev
  {
    Serie: string;
    Descripcion: string;
    Fecha: string;
    Hora: string;
    ServExt: string;
    Placa: string;
    Brevete: string;
    AutBulto: number;
    AutPeso: number;
    CuotaPeso: number;
    CuotaBulto: number;
    Bultos: string;
    PesoTotal: number;
    Paletizada: string;
    ServExtra: string;
        
    constructor( serie: string, descripcion: string,fecha: string,hora: string,
      servext: string, placa: string, brevete: string, autbulto : number,
      autpeso : number, cpeso: number, cbulto: number, bultos: string,
      ptotal: number, paletizada: string, servextra: string)
    {
        this.Serie = serie;
        this.Descripcion = descripcion;
        this.Fecha = fecha;
        this.Hora = hora;
        this.ServExt = servext;
        this.Placa = placa;
        this.Brevete =  brevete;
        this.AutBulto = autbulto;
        this.AutPeso = autpeso;
        this.CuotaBulto = cbulto;
        this.CuotaPeso = cpeso;
        this.Bultos = bultos;
        this.PesoTotal = ptotal;
        this.Paletizada = paletizada;
        this.ServExtra = servextra;


    }
  }

  
  export class TipoContenedor
  {
  Code: string;
  Desc: string;
  Abreviado: string;
  Capacidad: string;
  AbreviadoCapacidad: string;
  }

  
  export class TipoContenedores
  {
  Data : any;
  }
  
  export class CitasCHoras
  {
    Data: any;
  }

  export class InsertarCitaRQT
  {
   
    Token: string;
    IDRol: number;
    RegiCodigo: string;
    RetiCuotProgCodigo: string;
    PermCodigo:  string;
    Empaque: string;
    UnidadNeg: string;
    TipoCita: string;
    Trasegado: boolean;
    Extra: number;
    Extemp: number;
    Paletizada: number;
    ColdTreatment: boolean;
    FechaCT: string;
    HoraCT: string;
    LugarProg: string;
  }

  export class InsertarCitaRPT
  {   
    Cod: number;
    Msj: string;
  }

  
  export class InsertarCitaDetalleRQT
  {
   
    Token: string;
    IDRol: number;
    hojaServCodigo: string;
    PermCodigo: string;    
    PermDetaCodigo: string;

    ContCargCodigo:  string;
    VehiPlacaPri:  string;
    NroBrevete:  string;
    Registro:  string;  
    Contenedor:  string;  
    AutPeso:  number;
    AutBulto:  number;
    Peso:  number;
    Bulto:  number;
   
    Empaque:  string;  
    UnidadNeg: string;
    TipoCita: string;
    TipoCont: string;
    Trasegado: boolean;

    constructor(tok:string,idrol:number, codcita:string, permcodigo : string, permdetacodigo : string,
    contcargocodigo : string, placa : string, brevete : string, registro : string, contenedor : string, autpeso : number,
    autbulto : number, peso : number, bulto : number, empaque : string, unineg : string, tipocita : string,
    tipocont: string, trasegado: boolean)
    {
        this.Token = tok;
        this.IDRol = idrol;
        this.hojaServCodigo = codcita;
        this.PermCodigo =  permcodigo;
        this.PermDetaCodigo =  permdetacodigo;
        this.ContCargCodigo =  contcargocodigo;
        this.VehiPlacaPri =  placa;
        this.NroBrevete =  brevete;
        this.Registro =  registro;
        this.Contenedor =  contenedor;

        this.AutPeso =  autpeso;
        this.AutBulto =  autbulto;
        this.Peso =  peso;
        this.Bulto =  bulto;
        this.Empaque =  empaque;

        this.UnidadNeg =  unineg;
        this.TipoCita =  tipocita;
        this.TipoCont =  tipocont;
        this.Trasegado =  trasegado;

    }
   
  }

  
  export class InsertarCitaDetalleRPT
  {   
    Cod: number;
    Msj: string;
  }


  
  
  
  


