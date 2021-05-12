import { Area } from './Area';
import { Rol } from './Rol';
import { IsEmail, Length, MaxLength, MinLength } from 'class-validator';

export class Usuario {
    id!: number;

    @Length(4, 30, { message: 'nombres inválidos' })
    nombres: String = "";

    @Length(4, 30, { message: 'apellidos inválidos' })
    apellidos: String = "";

    @MaxLength(15, { message: 'El teléfono es inválido' })
    telefono: String = "";

    clave: String = "";

    @IsEmail()
    correo: String = "";

    correoalternativo: String = "";

    foto: String = "";

    estado: String = "";

    @MinLength(1)
    Idrol: number | undefined;

    @MinLength(1)
    IdArea: number | undefined;
    //-------------
    Area: Area = new Area();
    Rol: Rol = new Rol();

}