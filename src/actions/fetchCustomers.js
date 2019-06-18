import { FETCH_CUSTOMERS} from "./../constants";
import { createAction } from 'redux-actions';

const customers = [
    {
      dni: "2700000",
      name: "Yaneth Garcia",
      age: 37
    },
    {
      dni: "3000000",
      name: "Zoila Villatoro",
      age: 25
    },
    {
      dni: "3000001",
      name: "Erick Ventura",
      age: 25
    }
]

export const fetchCustomers = createAction(FETCH_CUSTOMERS, () => customers);