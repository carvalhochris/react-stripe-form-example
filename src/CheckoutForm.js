import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import ApiService from "./api";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  Center,
} from "@chakra-ui/react";

const CheckoutForm = () => {
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  // Handle real-time validation errors from the card Element.
  const handleChange = (event) => {
    if (event.error) {
      setError(event.error.message);
    } else {
      setError(null);
    }
  };

  // Handle form submission.
  const handleSubmit = async (event) => {
    event.preventDefault();
    const card = elements.getElement(CardElement);

    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card",
      card: card,
    });
    console.log(paymentMethod);

    if (error) {
      setError(error.response.data);
    } else {
      ApiService.saveStripeInfo({ email, payment_method_id: paymentMethod.id })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <Center>
    <form onSubmit={handleSubmit} className="stripe-form">
      {/* <Center> */}
      
      
      
      <Card maxW="xs">
        <div className="form-row">
        <label htmlFor="email">Email Address</label>
        <input
          className="form-input"
          id="email"
          name="name"
          type="email"
          placeholder="jenny.rosen@example.com"
          required
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
      </div>
        <div className="form-row">
        <label htmlFor="card-element">Credit or debit card</label>

        <CardElement id="card-element" onChange={handleChange} />
        
      </div>
        <div className="card-errors" role="alert">
          {error}
        </div>
        <button type="submit" className="submit-btn">
        Submit Payment
      </button>
        {/* <Center> */}
          <CardBody>
            <Text>
              View a summary of all your customers over the last month.
            </Text>
          </CardBody>
        {/* </Center> */}
      </Card>
      {/* </Center> */}
    </form>
    </Center>
  );
};
export default CheckoutForm;
