import React from "react";
import { Link } from "react-router-dom";

import { NavbarBottom } from "../../../components/ui/NavbarBottom";
import { Navbar } from "../../../components/ui/Navbar";
import "../../../style/pages/moreInfo/HowToUseTheReceiver.css";
export const HowToUseTheReceiver = () => {
  return (
    <div className="general-container">
      <Navbar />
      <div className="container-more-info-how-to-use">
        <div className="container-more-info-how-to-use-title">
          <Link to="/more_info">
            <p>
              <span>
                <i className="bi bi-chevron-left"></i>
                BACK TO ALL ARTICLES{" "}
              </span>
            </p>
          </Link>
        </div>
        <div className="container-info-cards">
          <div className="container-info-cards-body">
            <h5 className="card-title">How to use the receiver</h5>
            <div className="card-body">
              <p className="card-text">
                The receiver only works when an earphone is connected and the
                receiver switches to stand-by state. Push shortly on the power
                switch button to switch on the receiver. The channel number is
                shown on the LCD. The channel can be changed with the channel
                selector. The channel number is in accordance with the channel
                configuration set up in the transmitter.
              </p>
            </div>
          </div>
          <div className="container-info-cards-body">
            <div className="card-body">
              <p className="card-text">
                When working, the battery icon and the antenna icon will be
                displayed on the LCD to indicate the current battery and signal
                status. A battery symbol “ ” is visible on the display when the
                batteries or the battery pack is almost empty and needs
                recharging, but it still might work for 7-8 hours. When the
                signal is interrupted for a short time, the receiver mutes the
                earphones output. If the IR receiver does not get an adequate IR
                signal for more than 1 minute (e.g. when a delegate leaves the
                conference room), the receiver switches to stand-by state
                automatically.
              </p>
            </div>
          </div>
          <div className="container-info-cards-body">
            <div className="card-body">
              <p className="card-text">
                The volume can be adjusted and displayed on the LCD.
              </p>
            </div>
          </div>
          <div className="container-info-cards-body">
            <div className="card-body">
              <p className="card-text">
                To switch the receiver manually to stand-by mode, simply press
                and hold the on/off button for more than 2 seconds. If the
                earphone is disconnected, the receiver is switched off
                automatically.
              </p>
            </div>
          </div>
          <div className="container-info-cards-body">
            <div className="card-body">
              <p className="card-text">
                The infrared receivers are operable either with disposable
                batteries (2xAA alkaline cells) or with a rechargeable battery
                pack (HCS-5100BAT-16).
              </p>
            </div>
          </div>
          <div className="container-info-cards-body">
            <div className="card-body">
              <p className="card-text">
                Install the batteries or the battery pack with the correct
                polarity, as indicated in the battery compartment. A separate
                connection cable is required if a battery pack is used. The
                charging circuitry will not work if this cable is missing,
                preventing thus also charging of disposable batteries by
                mistake. The battery pack is equipped with a temperature sensor
                to prevent overheating during charging.
              </p>
            </div>
          </div>
        </div>
        <div className="container-help-links">
          <div className="container-help-link-body">
            <div className="help-links-title">
              <span>OTHER QUESTIONS</span>
            </div>
            <div className="help-links-body">
              <Link to="/more_info/request_support_during_event">
                <span>HOW TO REQUEST RECEIVERS</span>
              </Link>
            </div>
            <div className="help-links-body">
              <Link to="/more_info/how_to_return_the_devices">
                <span>HOW TO RETURN THE DEVICES</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="div-bottom-space"></div>
      </div>
      <NavbarBottom />
    </div>
  );
};