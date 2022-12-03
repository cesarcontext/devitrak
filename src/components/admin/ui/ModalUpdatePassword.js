import React from "react";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { devitrackApiAdmin } from "../../../apis/devitrackApi";
import { useForm } from "../../../hooks/useForm";
import { onLogin } from "../../../store/slices/adminSlice";
const customStyles = {
  content: {
    width: "25%",
    height: "30%",
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
  password1: "",
  password2: "",
};
export const ModalUpdatePassword = ({
  updatePasswordModalState,
  setUpdatePasswordModalState,
}) => {
  const { email, password1, password2, onInputCHange } = useForm(adminUserObj);
    const dispatch = useDispatch()

  if (updatePasswordModalState !== false) {
    Modal.setAppElement("#root");
  }
  function closeModal() {
    setUpdatePasswordModalState(false);
  }

  const onSubmit = async () => {
    if (password1 !== password2) {
      Swal.fire("error", "password must match", "error");
    }

    const response = await devitrackApiAdmin.put("/update-password", {
      email,
      password: password1,
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
        <div style={{textAlign:"center"}}>
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
            <div className="form-group mb-2">
              <input
                style={{ width: "100%" }}
                placeholder="Email address"
                type="text"
                name="email"
                value={email}
                onChange={onInputCHange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                style={{ width: "100%" }}
                placeholder="Password"
                type="password"
                name="password1"
                value={password1}
                onChange={onInputCHange}
              />
            </div>
            <div className="">
              <input
                style={{ width: "100%" }}
                placeholder="Repite password"
                type="password"
                name="password2"
                value={password2}
                onChange={onInputCHange}
              />
            </div>
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
              <button className="btn btn-delete" style={{ width: "45%" }} onClick={closeModal}>
                Cancel
              </button>
              <button className="btn btn-create" style={{ width: "45%" }} type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};
