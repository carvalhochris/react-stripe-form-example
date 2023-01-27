import axios from "axios";

export const API_URL ='https://warm-gorge-84676.herokuapp.com'

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-type": "application/json"
    }
});

 export default class ApiService{
     static saveStripeInfo(data={}){
         return api.post(`${API_URL}/payments/save-stripe-info/`, data)
     }
 }