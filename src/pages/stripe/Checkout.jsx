import { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import { Grid, Typography } from "@mui/material";
import { Button } from "antd";
import IndicatorProgressBottom from "../../components/indicatorBottom/IndicatorProgressBottom";

const Checkout = () => {
  const { clientSecret } = useSelector((state) => state.stripe);
  const { event } = useSelector((state) => state.event);
  const { consumer } = useSelector((state) => state.consumer);
  const stripe = useStripe();
  const elements = useElements();

  /**
   * message to display based on promise response
   * @type {String}
   */
  const [message, setMessage] = useState(null);
  /**
   * @description to dispatch action is loading or not
   * @type {boolean}
   */
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe || !clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret.clientSecret).then(({ paymentIntent }) => {
      if (!paymentIntent) {
        setMessage("Something went wrong.");
        return;
      }

      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe, clientSecret]);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (!stripe || !elements) {
  //     return;
  //   }

  //   setIsLoading(true);

  //   const { error, paymentIntent } = await stripe.confirmPayment({
  //     elements,
  //     confirmParams: {
  //       // Modify this to use window.top.location to avoid iframe security issues
  //       return_url: `${window.top.location.origin}/qr-code-generation`,
  //     },
  //     redirect: "always", // Always redirect, otherwise handle manually
  //   });

  //   if (error) {
  //     setMessage(error.message || "An unexpected error occurred.");
  //   } else if (paymentIntent?.status === "succeeded") {
  //     setMessage("Payment succeeded!");
  //     window.location.href = `${window.top.location.origin}/qr-code-generation`; // Manually redirect
  //   } else if (paymentIntent?.status === "processing") {
  //     setMessage("Your payment is processing.");
  //   } else {
  //     setMessage("Something went wrong.");
  //   }

  //   setIsLoading(false);
  // };

  const iFrameStyle = {
    base: {
      color: "var(--main-colorsfading-horizon)",
      fontSize: "16px",
      iconColor: "#fff",
      "::placeholder": {
        color: "var(--main-colorsfading-horizon)",
      },
    },
    invalid: {
      iconColor: "#FFC7EE",
      color: "#FFC7EE",
    },
    complete: {
      iconColor: "#cbf4c9",
    },
  };

  const paymentElementStyle = {
    style: iFrameStyle,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);
    const linkRedirected = myUrl + `/qr-code-generation`
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // We don't need return_url because we'll handle navigation manually
        return_url: linkRedirected
      },
      redirect: "if_required", // Only redirect if needed, otherwise handle manually
    });
    if (error) {
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message);
      }
      else if (error.code === "payment_intent_unexpected_state") {
        return window.location.href = linkRedirected; // Manually redirect
      }
      else {
        setMessage("An unexpected error occurred.");
      }
    } else if (paymentIntent.status === "succeeded" || paymentIntent.status === "requires_capture") {
      setMessage("Payment succeeded!");
      return window.location.href = linkRedirected; // Manually redirect
    } else if (paymentIntent.status === "processing") {
      setMessage("Your payment is processing.");
    } else {
      setMessage("Something went wrong.");
    }

    setIsLoading(false);
  };
  return (
    <>
      <Grid container>
        <Grid
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          margin={"0 auto"}
          item
          xs={11}
          sm={11}
          md={8}
          lg={6}
        >
          <Typography
            color={"var(--gray-900, #101828)"}
            textAlign={"center"}
            fontFamily={"Inter"}
            fontSize={"24px"}
            fontWeight={600}
            fontStyle={"normal"}
            lineHeight={"32px"}
            marginBottom={"2dvh"}
          >
            Last step,{" "}
            <span
              style={{
                textTransform: "capitalize",
              }}
            >
              {consumer.name}
            </span>
            !
          </Typography>
          <Typography
            color={"var(--gray-600, #475467)"}
            textAlign={"center"}
            fontFamily={"Inter"}
            fontSize={"16px"}
            fontWeight={400}
            fontStyle={"normal"}
            lineHeight={"24px"}
          >
            Enter your card details for your deposit. This will get returned to
            your card once all devices are returned.
          </Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          margin={"2dvh auto 0"}
          item
          xs={11}
          sm={11}
          md={8}
          lg={6}
        >
          <form
            style={{
              height: "65svh",
              width: "100vw",
              overflow: "scroll",
              padding: "15px 8px"
            }}
            id="payment-form"
            onSubmit={handleSubmit}
          >
            <PaymentElement
              options={paymentElementStyle}
              id="payment-element"
            />
            <Button
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                borderRadius: "8px",
                padding: "8px",
                border: "1px solid var(--blue-dark-600, #155EEF)",
                background: "var(--blue-dark-600, #155EEF)",
                boxShadow: "0px -4px 4px 0px rgba(0, 0, 0, 0.05)",
                margin: "1rem 0 0"
              }}
              htmlType="submit"
              disabled={isLoading || !stripe || !elements}
            >
              <span id="button-text">
                {isLoading ? (
                  <div className="spinner" id="spinner"></div>
                ) : (
                  <Typography
                    lineHeight={"24px"}
                    fontSize={"16px"}
                    fontFamily={"Inter"}
                    fontWeight={600}
                    color={"#fff"}
                  >
                    Authorize $
                    {clientSecret.paymentIntent.amount.toString().slice(0, -2)}
                  </Typography>
                )}
              </span>
            </Button>
            {message && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  borderRadius: "8px",
                  padding: "8px",
                  background: "#f74747",
                  color: "#fff",
                  boxShadow: "0px -4px 4px 0px rgba(0, 0, 0, 0.05)",
                }}
                id="payment-message"
              >
                {" "}
                <Typography color={"#fff"}>{message}</Typography>
              </div>
            )}
          </form>
        </Grid>
      </Grid>
      <Grid container>
        <Grid
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          marginTop={2}
          item
          xs={12}
        >
          <IndicatorProgressBottom
            steps={event.eventInfoDetail.merchant ? 3 : 2}
            current={100}
          />
        </Grid>{" "}
      </Grid>
    </>
  );
};

export default Checkout;
