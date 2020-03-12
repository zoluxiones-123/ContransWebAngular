export class FacturasRQT {
    IDUSer : number;
    IDRol : number;
    UnidadNeg : string;
    Desde : any;
    Hasta : any;
    Documento : string;
    Cliente : string;
  }

  export class FacturasRPT {
    FilePath    : string;
    FilePathXML : string;
    Registro    : string;
    Documento   : string;
    TipoDoc     : string;
    DocDate     : string;
    CardName    : string;
    NumAtCard   : string;
    DocCur      : string;
    Subtotal    : string;
    Igv         : string;
    Total       : string;
    DocDueDate  : string;
  }

  export class ListaUnidadNegocio {
    IDUnidadNegocio : string;
    UnidadNegocio   : string;
  }

  export class AlmacenRQT {
    EmpaCodigo : string;
   }

  export class Almacenes {
   Data : any;
  }

  
  export class TiposCarga {
    Data : any;
   }

  
export class TipoCarga {
  EmpaCodigo: string;
  EmpaIdentificador : string;
}


export class Almacen {
  AlmaCodigo: string;
  AlmaDescripcion : string;
}

export class TipoCita {
  TipoCodigo: string;
  TipoNombre : string;
}


export class TiposCita {
  Data : any;
 }

