import {Customer} from "./customer";

export class Order {
  id?: number;
  updated_at?: string;
  owner?: number;
  customer?: number;
  customer_info?: Customer;
  products?: Array<number>;
  amounts?: Array<number>;
  payment?: number;
  fulfillment?: number;
  total_price?: number;
  total_tax?: number;
  selected?: boolean = false;
  socket_state: string;
}
