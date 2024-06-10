import { IsStrongPasswordOptions } from 'class-validator';

export const SALT_ROUNDS = 10;

export const passwordOpts: IsStrongPasswordOptions = {
  minLength: 6,
  minLowercase: 1,
  minUppercase: 1,
  minNumbers: 1,
  minSymbols: 1,
};

export const passwdDescription =
  'La clave debe tener al menos 1 caracter en minúscula, 1 caracter en mayúscula, 1 dígito, 1 caracter especial y tener al menos 6 caracteres de longitud';
