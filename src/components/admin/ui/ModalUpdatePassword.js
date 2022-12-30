import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { devitrackApi, devitrackApiAdmin } from "../../../apis/devitrackApi";
import {
  rightDoneMessage,
  swalErrorMessage,
} from "../../../helper/swalFireMessage";
import { useForm } from "../../../hooks/useForm";
import { onLogin } from "../../../store/slices/adminSlice";
const customStyles = {
  content: {
    width: "25vw",
    height: "50vh",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)

const adminUserObj = {
  email: "",
  answer: "",
  password1: "",
  password2: "",
};
export const ModalUpdatePassword = ({
  updatePasswordModalState,
  setUpdatePasswordModalState,
}) => {
  const { email, answer, password1, password2, onInputCHange } =
    useForm(adminUserObj);
  const dispatch = useDispatch();
  const [dataToDisplay, setDataToDisplay] = useState([]);
  const navigator = useNavigate()
  if (updatePasswordModalState !== false) {
    Modal.setAppElement("#root");
  }
  function closeModal() {
    setUpdatePasswordModalState(true);
  }
  const callApiToCheckExistAdminUser = async () => {
    const response = await devitrackApi.get("/staff/admin-users");
    if (response) {
      console.log(response);
      setDataToDisplay(response.data.adminUsers);
    }
  };
  useEffect(() => {
    const controller = new AbortController();
    callApiToCheckExistAdminUser();

    return () => {
      controller.abort();
    };
  }, [updatePasswordModalState]);

  const checkAnswer = () => {
    let result = true;
    for (let data of dataToDisplay) {
      if (email === data.email) {
        if (answer.toLowerCase().trim() !== data.answer) {
          return (result = false);
        }
      }
    }
    return result;
  };
  const onSubmit = async () => {
    try {
      const response = await devitrackApiAdmin.put("/update-password", {
        email,
        password: password1,
        answer: answer,
      });
      if (response) {
        localStorage.setItem("admin-token", response.data.token);
        dispatch(
          onLogin({
            name: response.data.name,
            uid: response.data.uid,
            email: response.data.email,
            role: response.data.role,
          })
        );
        rightDoneMessage("Password updated");
        navigator("/admin")
      }
    } catch (error) {
      setUpdatePasswordModalState(false);
      swalErrorMessage(error.response.data.msg);
    }
  };
  return (
    <div>
      <Modal
        isOpen={updatePasswordModalState}
        onRequestClose={closeModal}
        style={customStyles}
        shouldCloseOnOverlayClick={false}
      >
        <div style={{ textAlign: "center" }}>
          <h2>Update password</h2>
          <form
            style={{
              margin: "auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            onSubmit={onSubmit}
          >
            <div className="mb-2">
              <input
                style={{
                  width: "15vw",
                  border: "solid 1px var(--main-colorsaluminium)",
                  paddingLeft: "1vw",
                }}
                placeholder="Email address"
                type="text"
                name="email"
                value={email}
                onChange={onInputCHange}
              />
            </div>
            {dataToDisplay?.map((data) => {
              if (email === data.email) {
                return (
                  <>
                    <div className="mb-2 form-control">
                      <p>Question:</p>
                      <h5
                        style={{
                          width: "15vw",
                          outline: "none",
                          paddingLeft: "1vw",
                          textDecoration: "underline",
                        }}
                      >
                        {data.question}
                      </h5>
                    </div>
                    <div
                      className={`mb-2 form-control ${
                        checkAnswer() === false ? "is-invalid" : ""
                      }`}
                    >
                      <input
                        style={{
                          width: "100%",
                          borderTop: "none",
                          borderRight: "none",
                          borderBottom: "solid 1px var(--main-colorsaluminium)",
                          borderLeft: "none",
                          outline: "none",
                          paddingLeft: "1vw",
                        }}
                        placeholder="Your secret answer"
                        type="text"
                        name="answer"
                        value={answer}
                        onChange={onInputCHange}
                      />
                      {answer !== "" && checkAnswer() === false ? (
                        <span>Answer does not match</span>
                      ) : (
                        ""
                      )}
                    </div>
                    <div
                      className={`mb-2 form-control ${
                        password1 !== password2 ? "is-invalid" : ""
                      }`}
                    >
                      <input
                        style={{
                          width: "100%",
                          borderTop: "none",
                          borderRight: "none",
                          borderBottom: "solid 1px var(--main-colorsaluminium)",
                          borderLeft: "none",
                          outline: "none",
                          paddingLeft: "1vw",
                        }}
                        placeholder="Password"
                        type="password"
                        name="password1"
                        value={password1}
                        onChange={onInputCHange}
                      />
                    </div>
                    <div
                      className={`mb-2 form-control ${
                        password1 !== password2 ? "is-invalid" : ""
                      }`}
                    >
                      <input
                        style={{
                          width: "100%",
                          borderTop: "none",
                          borderRight: "none",
                          borderBottom: "solid 1px var(--main-colorsaluminium)",
                          borderLeft: "none",
                          outline: "none",
                          paddingLeft: "1vw",
                        }}
                        placeholder="Repite password"
                        type="password"
                        name="password2"
                        value={password2}
                        onChange={onInputCHange}
                      />
                      {password1 !== password2 ? (
                        <span>Passwords does not match</span>
                      ) : (
                        ""
                      )}
                    </div>
                  </>
                );
              }
            })}

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "3%",
                width: "60%",
                margin: "3% auto",
                marginBottom: "0%",
              }}
            >
              <button
                className="btn btn-delete"
                style={{ width: "45%" }}
                onClick={closeModal}
              >
                Cancel
              </button>

              <button
                disabled={
                  checkAnswer() === false ||
                  password1 !== password2 ||
                  email === "" ||
                  password1 === "" ||
                  password2 === ""
                    ? true
                    : false
                }
                className="btn btn-create"
                style={{ width: "45%" }}
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};
