namespace schema;
using { Country, managed } from '@sap/cds/common';

entity Orders : managed {
    key orderID : UUID;
    soldTo : String;
    currency : String;
    items: Association to many OrderItems on items.orderID = orderID;
    customerID: Integer;
    customer: Association to Customers on customer.customerID = customerID;
}

entity OrderItems {
    key item: Integer;
    key orderID: UUID;
    order: Association to Orders on order.orderID = orderID;
    materialID: Integer;
    material: Association to Materials on material.materialID = materialID;
    netValue: Decimal(10, 2);
}

entity Materials {
    key materialID: Integer;
    description: String;
    type: String;
    email: String;
    firstName: String;
    lastName: String;
    orderItems: Association to many OrderItems on orderItems.materialID = materialID;
}

entity Customers {
    key customerID: UUID;
    name: String;
    orders: Association to many Orders on orders.customerID = customerID;
}