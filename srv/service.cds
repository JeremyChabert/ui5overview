using schema from '../db/schema';

service API {

  entity Orders  as projection on schema.Orders;

  entity OrderItems as projection on schema.OrderItems;

  entity Materials as projection on schema.Materials;

  entity Customers as projection on schema.Customers;

}