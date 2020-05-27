namespace my.service;
using { Country, managed } from '@sap/cds/common';

entity Orders : managed {
    key orderID : UUID;
    soldTo : String;
    currency : String;
}
