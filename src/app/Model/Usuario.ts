import { Area } from './Area';
import { Rol } from './Rol';
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, Length, Matches, MaxLength, MinLength } from 'class-validator';

export class Usuario {
    id!: number;

    @Length(3)
    @IsNotEmpty()
    @Matches(/^[a-zA-Z_-]$/)
    nombres: String = "";

    @Length(3)
    @IsNotEmpty()
    @Matches(/^[a-zA-Z_-]$/)
    apellidos: String = "";

    @MaxLength(15)
    @Matches(/[0-9]*/)
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