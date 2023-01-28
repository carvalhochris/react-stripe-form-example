import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import ApiService from "./api";
import { Card, CardHeader, CardBody, CardFooter, Text, Center, Alert, Button } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";


const CheckoutForm = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [email, setEmail] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    console.log(success);
    const card = elements.getElement(CardElement);
  
    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card",
      card: card,
    });
  
    if (error) {
      setError(error.response.data);
      setLoading(false);
    } else {
      ApiService.saveStripeInfo({ email, payment_method_id: paymentMethod.id })
        .then((response) => {
          console.log(response.data);
          setSuccess(true);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }
  };
  return (
    <Center>
      <form onSubmit={handleSubmit} className="stripe-form">
        <Card maxW="xs" p="10px" m="10px" minW="xs">
          <div className="form-row">
          {/* <br></br> */}
            <label htmlFor="email">Email Address</label>
            <br></br>
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
          <br></br>
          <div className="form-row">
            <label htmlFor="card-element">Credit or debit card</label>
            <br></br>
            {/* <hr></hr> */}
            <br></br>
            <CardElement id="card-element" onChange={handleChange} />
          </div>
          <CardBody>
            {/* <Text>
              View a summary of all your customers over the last month.
            </Text> */}
          </CardBody>
          <Button type="submit" className="submit-btn">Submit payment</Button>
          <br></br>
          {error && <Alert status="error">{error}</Alert>}
        {success && <Alert status="success">Payment Successful!<br></br>Keep an eye on your inbox!</Alert>}
        {loading && (
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        )}
        </Card>
        
        
        {/* <button type="submit" className="submit-btn">
            Submit Payment
        </button> */}
        
      </form>
    </Center>
  );
};
export default CheckoutForm;


