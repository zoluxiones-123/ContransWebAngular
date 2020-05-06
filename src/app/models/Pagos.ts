export class ConsultaPendientesRQT
{
    IDUser: number;
    IDRol: number;
    EntiCodigoCliente: string;
    Documento: string;
}

export class ConsultaPendientesRPT
{
    CodMsj: number;
    Msj: string;
    Data: any;
}

export class PendientePago
{
      Selec: boolean;
      Liquidacion: number;
      TDoc:  string ;
      Fecha:  string ;
      Cliente:  string ;
      AgAduanas:  string ;
      UnidadNegocio:  string ;
      CodUnidadNegocio:  string ;
      Documento:  string ;
      Naviera:  string ;
      NaveViaje:  string ;
      ListaPrecio:  string ;
      Estado:  string ;
      UM:  string ;
      MonedaAbrev:  string ;
      Moneda:  string ;
      TMon:  string ;
      MCod:  string ;
      Cantidad: number;
      PrecioUnit: number;
      SubTotal: number;
      Total: number;
      Servicio:  string ;
      GrupoServicio:  string ;
      LiquEstaCodigo: number;
      facturar:  string ;
      Currency : string;
}


export class PagosProcesarRQT
{
    IDUser: number;
    IDRol: number;
    TMon: string;
    MCod: string;
    Itot: number;
    Tope: string;
    Data: any;
}


export class PagosProcesarRPT
{
    Cod: number;
    Msj: string;
}


export class PagoProcesar
{
   NumDoc:  string;
   ImporteDoc: number;
   KDoc: number;
   Orig: string;
   TGrupo: string;
   TDoc: string;
   TMOV: string;   
 
}



export class ListaEstadoPagoCobranza {
    Codigo: string;
    Descripcion: string;
  }

  export class ConsultaPagosServicioRQT
{
    IDUser: number;
    IDRol: number;
    Nope: string;
    Kent: string;
    Estado: string;
}

/* export class ConsultaPagosServicioRPT
{
    CodMsj: number;
    Msj: string;
    Data: any;
} */

export class ConsultaPagosServicioRPT
{
    NServicio: string;
    Servicio: string;
    TMoneda: string;
    Importe: number;
    CanalPago: string;
    FormaPago: string;
    Banco: string;
    FRegistro: string;
    Estado: string;
    CodEstado: string;
    ClientePagador: string;
    Id: number;
    facturar: string;
}