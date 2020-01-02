export class DataSetItem{    
    label: any;                    
    backgroundColor: string;
    borderColor: string;
    data: any;
    constructor(etiqueta:any,bckColor:string,brdColor:string,datos:any)
    {
        this.label = etiqueta;
        this.backgroundColor = bckColor;
        this.borderColor = brdColor;
        this.data = datos;
    }
  }