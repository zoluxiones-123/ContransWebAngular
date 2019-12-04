export class SwAlert{    
    title: string;                    
    html: string;
    width: number;
    constructor(titulo:string,web:string,ancho:number)
    {
        this.title = titulo;
        this.html = web;
        this.width = ancho;
    }
  }