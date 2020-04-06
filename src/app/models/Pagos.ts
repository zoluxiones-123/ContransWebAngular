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
}
