import { Usuario } from './usuario';

export class Carro {
  id?: string;
  year?: number;
  licensePlate?: string;
  model?: string;
  color?: string;
  usuario?: Usuario;
}

export class CarroInput {
  year?: number;
  licensePlate?: string;
  model?: string;
  color?: string;
}
