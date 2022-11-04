import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAdminStore } from "../../hooks/useAdminStore";
import { onUserPrivacyPolicyResponse } from "../../store/slices/privacyPolicyUserResponseSlice";
import { PrivacyPolicyContract } from "./PrivacyPolicyContract";

const customStyles = {
  content: {
    width: "97%",
    height: "84%",
    top: "10%",
    left: "11%",
    right: "auto",
    bottom: "auto",
    marginRight: "-10%",
    transform: "translate(-10%, -10%)",
  },
};
// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)

export const UserConsentPrivacyPolicyModal = () => {
  const { errorMessage } = useAdminStore();
  const { response } = useSelector((state) => state.privacyPolicyUserResponse);
  console.log(
    "🚀 ~ file: UserConsentPrivacyPolicyModal.js ~ line 27 ~ UserConsentPrivacyPolicyModal ~ response",
    response
  );
  const [modalState, setModalState] = useState(true);
  console.log(
    "🚀 ~ file: UserConsentPrivacyPolicyModal.js ~ line 28 ~ UserConsentPrivacyPolicyModal ~ modalState",
    modalState
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const controller = new AbortController();
    if (response !== false) {
      setModalState(false);
    }
    return () => {
      controller.abort();
    };
  }, [response]);

  if (response === false && modalState !== false) {
    Modal.setAppElement("#root");
  }
  function closeModal() {
    setModalState(false);
  }

  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire("Incorrect credentials", errorMessage, "error");
    }
  }, [errorMessage]);

  const submitResponseToTermsAndConditions = (event) => {
    event.preventDefault();
    dispatch(onUserPrivacyPolicyResponse(true));
    setModalState(false);
  };

  return (
    <div>
      <Modal
        isOpen={modalState}
        onRequestClose={closeModal}
        style={customStyles}
        shouldCloseOnOverlayClick={false}
      >
        <div>
          <h2>Privacy Policy</h2>

          <form
            style={{
              width: "99%",
            }}
            onSubmit={submitResponseToTermsAndConditions}
          >
            <PrivacyPolicyContract />
            <div
              style={{
                display: "flex",
              }}
            >
              <button
                onClick={() => navigate("/declineTerms")}
                style={{ paddig: "5px" }}
              >
                Decline
              </button>
              <button type="submit" style={{ paddig: "5px" }}>
                Accept
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};
