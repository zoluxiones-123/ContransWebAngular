export class SwAlert{    
    title: string;                    
    html: string;
    width: number;
    confirmButtonText: string;
    constructor(titulo:string,web:string,ancho:number)
    {
        this.title = titulo;
        this.html = web;
        this.width = ancho;
        this.confirmButtonText = "Aceptar";
    }
  }

  export class SwAlertC{       
  title: string;
  text: string;
  icon: string;
  showCancelButton: boolean;
  confirmButtonColor: string;
  cancelButtonColor: string;
  confirmButtonText: string;
  width: number;
  }