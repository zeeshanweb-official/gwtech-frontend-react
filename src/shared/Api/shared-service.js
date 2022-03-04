export class CustomerService {
 getCustomersLarge() {
     return fetch("https://www.primefaces.org/data/customers").then(res => res.json())
             .then(d => d.customers);
 }

}