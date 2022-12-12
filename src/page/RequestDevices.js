import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useStytchSession } from "@stytch/stytch-react";
import { NavbarBottom } from "../components/ui/NavbarBottom";
import { Navbar } from "../components/ui/Navbar";
import { useDeviceCount } from "../hooks/useDeviceCountStore";
import "../style/pages/RequestDevices.css";
import { useSelector } from "react-redux";
import { devitrackApi } from "../apis/devitrackApi";

export const RequestDevices = () => {
  const session = useStytchSession();
  const { users } = useSelector(state => state.contactInfo)
  const { device } = useDeviceCount();
  const [stripeTransactions, setStripeTransactions] = useState([])

  useEffect(() => {
    const controller = new AbortController();
    devitrackApi
      .get("/admin/users")
      .then((response) => response.data)
      .then((data) => setStripeTransactions(data.stripeTransactions));
    return () => {
      controller.abort();
    };
  }, [users.id]);

  const list = []
  const checkPaymentIntentPerUser = async() => {
    stripeTransactions?.map(item => {
      if( item.user.email === users.email){
      return list.push(item.device)
      }
    })
  }
  checkPaymentIntentPerUser()
  return (
    <div className="general-container">
      <Navbar />
      <div className="container-request-device-section">
        <div>
          <h4>Your current order</h4>
        </div>
        <div className="container-request-current-order">
          <div
            className="container-request-current-order-display">
            <p>
              {list.at(-1)} {device > 1 ? "Devices" : "Devices"}
            </p>
            <p>${list.at(-1) * 200} deposit</p>
          </div>
        </div>
        <div className="view-more-details-acount">
          <Link to="/my_profile">
            <span>
              VIEW MORE DETAILS IN YOUR ACCOUNT{" "}
              <i className="bi bi-chevron-right"></i>
            </span>
          </Link>
        </div>
        <div>
          <div className="request-more-devices-button">
            <span>Would you like to request more?</span>

            {users.id !== "" || session ? (
              <Link to="/checkout">
                <button className="btn" id="btn-rquest-more-device"><p>REQUEST MORE DEVICES</p></button>
              </Link>
            ) : (
              <Link to="/">
                <button className="btn" id="btn-rquest-more-device"><p>REQUEST MORE DEVICES</p></button>
              </Link>
            )}
          </div>
        </div>
        <div className="request-device-help-links-body">
          <div
            style={{
              marginTop: "1%",
              marginBottom: "3%",
            }}
          >
            <Link to="/more_info">
              <span>OTHER RESOURCES</span>
            </Link>
          </div>
          <div
          className="link-help-router"
          >
            <Link to="/more_info/how_to_use_the_receiver">
              <span>HOW TO USE THE RECEIVERS</span>
            </Link>
          </div>
          <div
          className="link-help-router"
          >
            <Link to="/more_info/request_support_during_event">
              <span>HOW TO REQUEST SUPPORT DURING THE EVENT</span>
            </Link>
          </div>
          <div
          className="link-help-router"
          >
            <Link to="/more_info/how_to_return_the_devices">
              <span>HOW TO RETURN THE DEVICES</span>
            </Link>
          </div>
        </div>
      </div>
      <NavbarBottom />
    </div>
  );
};
