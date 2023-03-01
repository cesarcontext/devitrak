import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { devitrackApiAdmin } from "../../../apis/devitrackApi";
import { useAdminStore } from "../../../hooks/useAdminStore";
import { useForm } from "../../../hooks/useForm";
import { swalErrorMessage } from "../../../helper/swalFireMessage";

let registerFormFields = {
  registerName: "",
  registerEmail: "",
  registerPassword: "",
  registerPassword2: "",
  registerSecretQuestion: "",
  registerSecretAnswer: "",
};
// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)

export const ModalAdminNewUser = ({ modalState, setModalState }) => {
  const { errorMessage } = useAdminStore();
  const {
    registerName,
    registerEmail,
    registerPassword,
    registerPassword2,
    registerSecretQuestion,
    registerSecretAnswer,
    onInputCHange: onRegisterInputChange,
  } = useForm(registerFormFields);
  const [rolePermission, setRolePermission] = useState(null);
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  if (modalState !== false) {
    Modal.setAppElement("#root");
  }
  function closeModal() {
    setModalState(false);
  }
  const handleResize = () => {
    setScreenSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  const customeStyleBaseOnScreenSize = () => {
    let customStyles;
    if (screenSize.width < 1025) {
      return (customStyles = {
        content: {
          width: "50vw",
          height: "50vh",
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
        },
      });
    } else {
      return (customStyles = {
        content: {
          width: "25vw",
          height: "60vh",
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
        },
      });
    }
  };
  customeStyleBaseOnScreenSize();

  useEffect(() => {
    handleResize();
    if (errorMessage !== undefined) {
      swalErrorMessage(errorMessage);
    }
  }, [errorMessage]);

  const onSubmitRegister = async (event) => {
    event.preventDefault();

    if (registerPassword !== registerPassword2) {
      swalErrorMessage("Passwords must match");
      return;
    } else {
      const { data } = await devitrackApiAdmin.post("/new_admin_user", {
        name: registerName,
        email: registerEmail,
        password: registerPassword,
        question: registerSecretQuestion,
        answer: registerSecretAnswer.toLowerCase().trim(),
        role: rolePermission,
      });
      if (data) closeModal();
    }
  };
  return (
    <div>
      <Modal
        isOpen={modalState}
        onRequestClose={closeModal}
        style={customeStyleBaseOnScreenSize()}
        shouldCloseOnOverlayClick={false}
      >
        <div className="container-modal-form">
          <h2>Create New Admin User</h2>

          <form onSubmit={onSubmitRegister}>
            <div className="form-group mb-2 mt-3">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                name="registerName"
                value={registerName}
                onChange={onRegisterInputChange}
              />
            </div>
            <div className="form-group mb-2 mt-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                name="registerEmail"
                value={registerEmail}
                onChange={onRegisterInputChange}
              />
            </div>
            <div className="form-group mb-2 mt-3">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                name="registerPassword"
                value={registerPassword}
                onChange={onRegisterInputChange}
              />
            </div>

            <div className="form-group mb-2 mt-3">
              <input
                type="password"
                className="form-control"
                placeholder="Repite password"
                name="registerPassword2"
                value={registerPassword2}
                onChange={onRegisterInputChange}
              />
            </div>
            <div className="form-group mb-2 mt-3">
              <select
                className="form-control"
                value={registerSecretQuestion}
                name="registerSecretQuestion"
                onChange={onRegisterInputChange}
              >
                <option defaultValue>Choose your question</option>
                <option value="What was the make of your first car?">
                  What was the make of your first car?
                </option>
                <option value="In what city were you born?">
                  In what city were you born?
                </option>
                <option value="What is the name of your favorite pet?">
                  What is the name of your favorite pet?
                </option>
                <option value="What is your mother's maiden name?">
                  What is your mother's maiden name?
                </option>
                <option value="What high school did you attend?">
                  What high school did you attend?
                </option>
                <option value="What was your favorite food as a child?">
                  What was your favorite food as a child?
                </option>
                <option value="Where did you meet your spouse?">
                  Where did you meet your spouse?
                </option>
                <option value="What year was your father (or mother) born?">
                  What year was your father (or mother) born?
                </option>
              </select>
            </div>
            <div className="form-group mb-2 mt-3">
              <input
                type="text"
                className="form-control"
                placeholder="Provide an answer"
                name="registerSecretAnswer"
                value={registerSecretAnswer}
                onChange={onRegisterInputChange}
              />
            </div>
            <div className="form-group mb-2 mt-3 form-input-registration-admin-user">
              <select
              style={{border:"solid 1px var(--main-colorszen)"}}
                name="role"
                onChange={(event) => setRolePermission(event.target.value)}
              >
                <option defaultValue>Please select role permission</option>
                <option value="Administrator">Administrator</option>
                <option value="Approver">Approver</option>
                <option value="Editor">Editor</option>
              </select>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
                width: "20vw",
                marginTop: "2vh",
              }}
            >
              <button
                style={{ width: "30%" }}
                className="btn btn-delete"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                style={{ width: "45%" }}
                className="btn btn-create"
                type="submit"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};
