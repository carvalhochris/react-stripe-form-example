import logo from './logo.svg';
import './App.css';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from "@stripe/stripe-js/pure";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe('pk_test_VZ1hztjRaEh9jZYDMHVyuFCj');

const App = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);


export default App;
