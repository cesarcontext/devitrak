import { notification } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; // Assuming you're using react-router
import { onResetConsumerInfo } from "../../store/slides/consumerSlide";
import { onResetArticleInfo } from "../../store/slides/articleHandlerSlide";
import { onHardReset } from "../../store/slides/deviceSlides";
import {
  onAddAmountStripeInfo,
  onAddPaymentIntent,
  onResetCustomerStripeInfo,
} from "../../store/slides/stripeSlide";

const InactivityLogout = ({ children }) => {
  const [isActive, setIsActive] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [api, contextHolder] = notification.useNotification();
  const openNotification = () => {
    api.open({
      message: "You have been logged out due to inactivity.",
      duration: 0,
    });
  };
  useEffect(() => {
    let logoutTimer;

    // Function to reset the timer
    const resetTimer = () => {
      setIsActive(true);
      clearTimeout(logoutTimer);
      logoutTimer = setTimeout(() => {
        handleLogout();
      }, 20 * 60 * 1000);
    };

    // Function to handle logout
    const handleLogout = () => {
      setIsActive(false);
      openNotification();
      dispatch(onResetConsumerInfo());
      dispatch(onResetArticleInfo());
      dispatch(onHardReset());
      dispatch(onAddPaymentIntent(undefined));
      dispatch(onAddAmountStripeInfo(0));
      dispatch(onResetCustomerStripeInfo());
      navigate("/");
    };

    // Add event listeners for user activity
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    window.addEventListener("scroll", resetTimer);
    window.addEventListener("click", resetTimer);

    // Start the timer
    resetTimer();

    // Cleanup on component unmount
    return () => {
      clearTimeout(logoutTimer);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      window.removeEventListener("scroll", resetTimer);
      window.removeEventListener("click", resetTimer);
    };
  }, [navigate]);

  return (
    <>
      {contextHolder}
      {isActive ? children : null}
    </>
  );
};

export default InactivityLogout;
