namespace schema;
using { Country, managed } from '@sap/cds/common';

entity Orders : managed {
    key orderID : UUID;
    soldTo: String;
    type: String;
    netValue: Decimal(13, 2);
    currency: String;
    items: Association to many OrderItems on items.orderID = orderID;
    customer: Association to Customers on customer.customerID = soldTo;
    createdAt: DateTime;
    status: String;
    year: Integer;
}

entity OrderItems {
    key item: Integer;
    key orderID: UUID;
    materialID: String;
    quantity: Integer;
    netValue: Decimal(13, 2);
    year: Integer;
    order: Association to Orders on order.orderID = orderID;
    material: Association to Materials on material.materialID = materialID;
}

entity Materials {
    key materialID: String;
    description: String;
    type: String;
    unitPrice: Decimal(13, 2);
    components: String;
    orderItems: Association to many OrderItems on orderItems.materialID = materialID;
}

entity Customers {
    key customerID: String;
    name: String;
    phone: String;
    street: String;
    city: String;
    country: String;
    website: String;
    orders: Association to many Orders on orders.soldTo = customerID;
}

entity ProcessGroups {
    key id: Integer;
    title: String;
}

entity ProcessLines {
    key fromId: Integer;
    toId: Integer;
}

entity ProcessNodes {
    key id: Integer;
    title: String;
    status: String;
    icon: String;
    groupId: Integer;
}