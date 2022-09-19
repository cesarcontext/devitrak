import React from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import { useContactInfoStore } from "../hooks/useContactInfoStore";
import { usePaymentStore } from "../hooks/usePaymentStore";
import { useUiStore } from "../hooks/useUiStore";

const customStyles = {
  content: {
    top: "3%",
    left: "50%",
    transform: "translate(-50%)",
    width: "35%",
    height: "85%",
    borderRadius: "15px",
    zIndex: "7",
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");

export const ConfirmationModal = () => {
  const { users, userParseStored  } = useContactInfoStore();
  const { creditCardState, startSavingPaymentInfo } = usePaymentStore();
  const { isModalOpen, closeModal } = useUiStore();

  const onCloseModal = () => {
    closeModal();
  };

  console.log("users in modal", users)

  let groupName;
  let name;
  let lastName;
  let email;
  let phoneNumber
  
  userParseStored.map((item) => {
    return (
      <>
        {(groupName = item.groupName)}
        {(name = item.name)}
        {(lastName = item.lastName)}
        {(email = item.email)}
        {(phoneNumber = item.phoneNumber)}
      </>
    );
  });

  let cardName;
  let cardNumber;
  let mm;
  let yy;
  let cvv;
  let zip;
  let country;

  creditCardState.map((item) => {
    return (
      <>
        {(cardName = item.cardName)}
        {(cardNumber = item.cardNumber)}
        {(mm = item.mm)}
        {(yy = item.yy)}
        {(cvv = item.cvv)}
        {(zip = item.zip)}
        {(country = item.country)}
      </>
    );
  });

  const submitInfoToSaveInDataBase = async () => {

    await startSavingPaymentInfo({
      cardName,
      cardNumber,
      mm,
      yy,
      cvv,
      zip,
      country,
    });

    closeModal();
  };

  return (
    <div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={onCloseModal}
        style={customStyles}
        contentLabel="modal"
        shouldCloseOnOverlayClick={false}
      >
        <div
          style={{
            width: "60%",
            height: "90%",
            margin: "auto",
          }}
        >
          <div
            className="alert-sign-modal"
            style={{
              display: "flex",
              jsutifyContent: "center",
              alignItem: "center",
              marginBottom: "5%",
            }}
          >
            <i className="bi bi-question-diamond"></i>
          </div>
          <br />
          <h4
            style={{
              textAlign: "center",
            }}
          >
            {" "}
            Please make sure your information looks correct before submitting
          </h4>
          <div
            className="card"
            style={{
              border: "solid 1px #212529",
              borderRadius: "15px",
              width: "100%",
            }}
          >
            <div className="card-body">
              <div className="card-text">
                <div>
                  <div>
                    <span>Group name: </span>
                    {groupName}
                  </div>
                  <div>
                    <span>Name: </span>
                    {name}
                  </div>
                  <div>
                    <span>Last name: </span>
                    {lastName}
                  </div>
                  <div>
                    <span>Email: </span>
                    {email}
                  </div>
                  <div>
                    <span>Phone number: </span>
                    {phoneNumber}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />
          <div>
            <div
              className="card"
              style={{
                border: "solid 1px #212529",
                borderRadius: "15px",
                width: "100%",
              }}
            >
              <div className="card-body">
                <div className="card-text">
                  <div>
                    <div>
                      <span>
                        Card name:
                        {cardName}
                      </span>
                    </div>
                    <div>
                      <span>
                        Card number:
                        {cardNumber}
                      </span>
                    </div>
                    <div>
                      <span>
                        Expiration date:{mm} / {yy}
                      </span>
                    </div>
                    <div>
                      <span>CVV: {cvv}</span>
                    </div>
                    <div>
                      <span>Zip code: {zip}</span>
                    </div>
                    <div>
                      <span>
                        Country:
                        {country}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />
          <div>
            <button
              style={{
                backgroundColor: "transparent",
                outline: "transparent",
                border: "solid 1px #fff",
                display: "flex",
                textAlign: "center",
              }}
              onClick={closeModal}
            >
              <p
                style={{
                  width: "100%",
                  fontSize: "15px",
                }}
              >
                <i className="bi bi-chevron-left"></i> GO BACK AND MAKE
                CORRECTIONS
              </p>
            </button>
          </div>
          <br />
          <div>
            <span>
              <p>
                A <strong>$200</strong> hold per device will be placed on your
                card
              </p>
            </span>
          </div>
          <br />
          <div
            style={{
              margin: "auto",
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Link to="/confirmation">
              <button
                style={{
                  margin: "auto",
                  backgroundColor: "rgba(69, 104, 220, 1)",
                  color: "#ffff",
                  height: "5vh",
                  borderRadius: "10px",
                  outline: "transparency",
                  border: "rgba(69, 104, 220, 1)",
                  fontSize: "10px",
                  width: "100%",
                }}
                onClick={submitInfoToSaveInDataBase}
              >
                AUTORIZED CARD & PROCEED
              </button>
            </Link>
          </div>
        </div>
      </Modal>
    </div>
  );
};
