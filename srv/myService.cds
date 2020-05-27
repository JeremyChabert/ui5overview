using my.service as my from '../db/myModel';

service myService {
  entity Orders  as projection on my.Orders;
}