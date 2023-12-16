import { Carro } from './carro';

export class Usuario {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  birthday?: string;
  login?: string;
  password?: string;
  phone?: string;
  cars?: Carro[];
}

export class UsuarioOutputDTO {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  birthday?: string;
  login?: string;
  phone?: string;
  cars?: Carro[];
}
