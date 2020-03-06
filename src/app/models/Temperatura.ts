 export class TemperaturaRQT {
    IDUSer : number;
    IDRol : number;
    Contenedor : string;
  } 

   export class TemperaturaRPT {
    CodMensaje: string;
    Mensaje: string;
    ContCargCodigo: string;
    Contnumero: string;
    BookLineNroDoc: string;
    EntiCodigoEmbarcador: string;
    Embarcador: string;
    EntiCodigoLinea: string;
    Linea: string;
    Nave: string;
    FechaSalida: string;


  } 
  export class TemperaturaDetalleRQT {
    IDUSer : number;
    IDRol : number;
    FechaIni : any;
    FechaFin : any;
    CodContenedor : string;
    BookLineNroDoc : string;
  } 
  
   export  class TemperaturaDetalleRPT {
    public CodMensaje : number;
    public Mensaje : string;
    public ContCargCodigo : string;
    public Contnumero : string;
    public BookLineNroDoc : string;
    public EntiCodigoEmbarcador : string;
    public Embarcador : string;
    public EntiCodigoLinea : string;
    public Linea : string;
    public Nave : string;
    public FechaSalida : string;
    public Data: TemperaturaDataRPT;
    public VD: TemperaturaVDRPT;
  }

  export class TemperaturaDataRPT {
    public Data:any;
  }

  export class TemperaturaVDRPT {
    public VD:any;
  }

  export class CartaTemperaturaRQT {
    IDUser: number;
    IDRol: number;
    EntiCodi: string;
    Kvje: string;
    NBooking: string;
    Emba: string;
    Esta: string;
    Desde: any;
    Hasta: any;
  } 

  export class AnularCerrarCartaTemperaturaRQT {
    Id	: string;
    Usuario: string;
  } 
  export class AnularCerrarCartaTemperaturaRPT {
    public Data:any;
/*     Cod	: number;
    Msj: string; */
  } 

   export class CartaTemperaturaRPT {
    BctId: number;
    KRefOscar: string;
    CodViaje: string;
    NaveViaje: string;
    Producto: string;
    CodEmbarcador: string;
    Embarcador: string;
    CodConsignatario: string;
    Consignatario: string;
    Temp: string;
    TVent: string;
    Vent: string;
    Hume: string;
    O2: string;
    CO2: string;
    Specials: string;
    Ctem: boolean;
    CTreat: boolean;
    CAtmo: boolean;
    FCTemp: any;
    Usuario: string;
    Email: string;
    Estado: string;
    Eta: any;
    EstCamb: number;
  }   
  
  export class ListaEstado {
    Entidad : string;
    Nombre   : string;
  }
