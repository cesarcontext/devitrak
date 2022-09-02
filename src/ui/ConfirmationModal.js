import React, { useRef } from "react";
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
  const { users, startSavingContactInfo } = useContactInfoStore();
  const { paymentState } = usePaymentStore();
  const { isModalOpen, closeModal } = useUiStore();

  const onCloseModal = () => {
    closeModal();
  };

  const lastElement = [paymentState.at(-1)];

  let groupName;
  let name;
  let lastName;
  let email;
  let phoneNumber;

  users.map((item) => {
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

  const inputRefGroupName = useRef("");
  const inputRefName = useRef("");
  const inputRefLastName = useRef("");
  const inputRefEmail = useRef("");
  const inputRefPhoneNumber = useRef("");


  const check = {
    groupName: inputRefGroupName.current.value,
    name: inputRefName.current.value,
    lastName: inputRefLastName.current.value,
    email: inputRefEmail.current.value,
    phoneNumber: inputRefPhoneNumber.current.value,
  }

  console.log({check})
  const submitInfoToSaveInDataBase = () => {
    startSavingContactInfo({
      groupName: inputRefGroupName.current.value,
      name: inputRefName.current.value,
      lastName: inputRefLastName.current.value,
      email: inputRefEmail.current.value,
      phoneNumber: inputRefPhoneNumber.current.value,
    })

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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width=""
              height="30"
              fill="currentColor"
              className="bi bi-exclamation-diamond"
              viewBox="0 0 16 16"
            >
              <path d="M6.95.435c.58-.58 1.52-.58 2.1 0l6.515 6.516c.58.58.58 1.519 0 2.098L9.05 15.565c-.58.58-1.519.58-2.098 0L.435 9.05a1.482 1.482 0 0 1 0-2.098L6.95.435zm1.4.7a.495.495 0 0 0-.7 0L1.134 7.65a.495.495 0 0 0 0 .7l6.516 6.516a.495.495 0 0 0 .7 0l6.516-6.516a.495.495 0 0 0 0-.7L8.35 1.134z" />
              <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z" />
            </svg>
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
                {users.map((item, index) => {
                  return (
                    <div key={index}>
                       <div>
                        <span>
                          Name:
                          {/* {item.name} */}
                        </span>
                        <input defaultValue={groupName} ref={inputRefGroupName} />
                      </div>
                      <div>
                        <span>
                          Name:
                          {/* {item.name} */}
                        </span>
                        <input defaultValue={name} ref={inputRefName} />
                      </div>
                      <div>
                        <span>
                          Last name:
                          {/* {item.lastName} */}
                        </span>
                        <input defaultValue={lastName} ref={inputRefLastName} />
                      </div>
                      <div>
                        <span>
                          Email:
                          {/* {item.email} */}
                        </span>
                        <input defaultValue={email} ref={inputRefEmail} />
                      </div>
                      <div>
                        <span>
                          Phone number:
                          {/* {item.phoneNumber} */}
                        </span>
                        <input defaultValue={phoneNumber} ref={inputRefPhoneNumber} />
                      </div>
                    </div>
                  );
                })}
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
                  {lastElement.map((item) => {
                    return (
                      <div key={item.id}>
                        <div>
                          <span>Card name: {item.cardName}</span>
                        </div>
                        <div>
                          <span>Card number: {item.cardNumber}</span>
                        </div>
                        <div>
                          <span>
                            Expiration date: {item.mm} / {item.yy}
                          </span>
                        </div>
                        <div>
                          <span>CVV: {item.cvv}</span>
                        </div>
                        <div>
                          <span>Zip code: {item.zip}</span>
                        </div>
                        <div>
                          <span>Country: {item.country}</span>
                        </div>
                      </div>
                    );
                  })}
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
