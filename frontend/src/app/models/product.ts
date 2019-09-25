import {Variation} from "./variation";

export class Product {
  id?: number;
  name?: string;
  description?: string;
  image?: string;
  sku?: string;
  price?: number = 0.00;
  company?: number;
  variations?: Variation[];
  variation_type: any;
  is_active?: boolean;
  socket_state: string;

}
