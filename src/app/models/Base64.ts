export class Base64RQT {
    Carpeta: string;
    Base64: string;
    NombreArc: string;
    TipoArc: string;
    constructor(desk:string, base64:string,archivo:string, tipoarc:string)
    {
        this.Carpeta = desk;
        this.Base64 = base64;
        this.NombreArc = archivo;
        this.TipoArc = tipoarc;
    }
}

export class Base64RPT {
    Archivo: string;
}
