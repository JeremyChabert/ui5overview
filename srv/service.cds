using schema from '../db/schema';

service API {

  entity Orders  as projection on schema.Orders;

  entity OrderItems as projection on schema.OrderItems;

  entity Materials as projection on schema.Materials;

  entity Customers as projection on schema.Customers;

  entity ProcessGroups as projection on schema.ProcessGroups;

  entity ProcessLines as projection on schema.ProcessLines;

  entity ProcessNodes as projection on schema.ProcessNodes;

}