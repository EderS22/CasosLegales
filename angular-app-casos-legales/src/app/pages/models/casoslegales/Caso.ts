export class Caso {
    caso_Id!: number;
    caso_Descripcion!: string;
    tica_Id!: number;
    abju_IdJuez!: number;
    caso_TipoDemandante!: string;
    caso_IdDemandante!: number;
    abju_IdAbogadoDemandante!: number;
    abju_IdAbogadoDemandado!: number;
    caso_Abierto!: boolean
    caso_Fecha!: Date;
    usua_IdCreacion!: number;
    caso_FechaCreacion!: Date;
    usua_IdModificacion!: number;
    caso_FechaModificacion!: Date;
}