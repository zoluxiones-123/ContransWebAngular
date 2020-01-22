export class FileItem{    
    name: string;                    
    size: number;
    base64: string;
    index: number;
    constructor(nombre:string,tamanio:number, base64:string, ind : number)
    {
        this.name = nombre;
        this.size = tamanio;
        this.base64 = base64;
        this.index =  ind;
    }
  }