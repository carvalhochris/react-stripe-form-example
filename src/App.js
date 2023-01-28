import logo from './logo.svg';
import './App.css';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from "@stripe/stripe-js/pure";
import CheckoutForm from "./CheckoutForm";
import { ChakraProvider } from '@chakra-ui/react'

const stripePromise = loadStripe('pk_test_VZ1hztjRaEh9jZYDMHVyuFCj');

const App = () => (
  <ChakraProvider>
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  </ChakraProvider>
);


export default App;
