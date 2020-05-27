using schema from '../db/schema';

service API {
  entity Orders  as projection on schema.Orders;
}