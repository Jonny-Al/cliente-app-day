import { Area } from './Area';
import { Rol } from './Rol';
import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';

export class Usuario {
    id!: number;

    @IsNotEmpty()
    @Matches(/^[a-z A-Z_-]{3,150}$/)
    nombres: String = "";

    @IsNotEmpty()
    @Matches(/^[a-z A-Z_-]{3,150}$/)
    apellidos: String = "";

    @Matches(/^[0-9]\d{0,12}$/)
    telefono: String = "";

    @MinLength(8)
    clave: String = "";

    @IsEmail()
    correo: String = "";

    correoalternativo: String = "";

    foto: String = "";

    estado!: number;

    @MinLength(1)
    Idrol: number | undefined;

    @MinLength(1)
    IdArea: number | undefined;
    //-------------
    Area: Area = new Area();
    Rol: Rol = new Rol();

}