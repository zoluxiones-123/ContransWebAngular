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
    /*public CodigoHoraControlTemp: number;
    public HoraControlTemp : string;
    public CodigoControlTemp: number;
    public ContCargCodigo : string;
    public ContNumero : string;
    public BookLineNroDoc : string;
    public TSUPP : string;
    public TRET : string;
    public RH : string;
    public O2 : string;
    public CO2 : string;
    public USDA1 : string;
    public USDA2 : string;
    public USDA3 : string;
    public ALARMA : string;
    public FechaReg : any;
    public Dia : any; */
  }

  export class TemperaturaVDRPT {
    public VD:any;
/*     SP : string;
    RH : string;
    VENT : string;
    O2 : string;
    CO2 : string; */
  }
