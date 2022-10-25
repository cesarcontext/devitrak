import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import Swal from "sweetalert2";
import { devitrackApiAdmin } from "../../../apis/devitrackApi";
import { useAdminStore } from "../../../hooks/useAdminStore";
import { useForm } from "../../../hooks/useForm";
const customStyles = {
  content: {
    width: "20%",
    height: "40%",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

let registerFormFields = {
  registerName: "",
  registerEmail: "",
  registerPassword: "",
  registerPassword2: "",
};
// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)

export const ModalAdminNewUser = ({ modalState, setModalState }) => {
  const { errorMessage } = useAdminStore();
  const {
    registerName,
    registerEmail,
    registerPassword,
    registerPassword2,
    onInputCHange: onRegisterInputChange,
  } = useForm(registerFormFields);
  const [rolePermission, setRolePermission] = useState(null);

  if (modalState !== false) {
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

  // const validationName = useMemo(() => {
  //   return adminUserRegistration.fullName.length > 0 ? "" : "is-invalid";
  // }, [adminUserRegistration.fullName]);

  // const validationPassword = useMemo(() => {
  //   return adminUserRegistration.password.length > 0 ? "" : "is-invalid";
  // }, [adminUserRegistration.password]);

  // const validationEmail = useMemo(() => {
  //   return adminUserRegistration.email.length > 3 &&
  //     adminUserRegistration.email
  //       .toLowerCase()
  //       .match(
  //         /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  //       )
  //     ? ""
  //     : "is-invalid";
  // }, [adminUserRegistration.email]);

  const onSubmitRegister = async (event) => {
    event.preventDefault();
    console.log(
      (registerFormFields = {
        registerName,
        registerEmail,
        registerPassword,
        registerPassword2,
      })
    );
    if (registerPassword !== registerPassword2) {
      Swal.fire("error", "Passwords must match", "error");
      return;
    } else {
      const { data } = await devitrackApiAdmin.post("/new_admin_user", {
        name: registerName,
        email: registerEmail,
        password: registerPassword,
        role: rolePermission,
      });
      console.log(data);
      if (data) closeModal();
    }
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
          <h2>Create New Admin User</h2>

          <form onSubmit={onSubmitRegister}>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                name="registerName"
                value={registerName}
                onChange={onRegisterInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                name="registerEmail"
                value={registerEmail}
                onChange={onRegisterInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                name="registerPassword"
                value={registerPassword}
                onChange={onRegisterInputChange}
              />
            </div>

            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Repite password"
                name="registerPassword2"
                value={registerPassword2}
                onChange={onRegisterInputChange}
              />
            </div>
            <div className="form-input-registration-admin-user">
              <select
                name="role"
                onChange={(event) => setRolePermission(event.target.value)}
              >
                <option defaultValue>Please select role permission</option>
                <option value="Administrator">Administrator</option>
                <option value="Approver">Approver</option>
                <option value="Editor">Editor</option>
              </select>
            </div>

            <div className="d-grid gap-2">
              <input
                type="submit"
                className="btnSubmit"
                value="Register user"
              />
              <button onClick={closeModal}>Cancel</button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};
/**
 * <form onSubmit={onSubmitRegister}>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                name="registerName"
                value={registerName}
                onChange={onRegisterInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                name="registerEmail"
                value={registerEmail}
                onChange={onRegisterInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                name="registerPassword"
                value={registerPassword}
                onChange={onRegisterInputChange}
              />
            </div>

            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Repite password"
                name="registerPassword2"
                value={registerPassword2}
                onChange={onRegisterInputChange}
              />
            </div>
            <div className="form-input-registration-admin-user">
              <select name="role" value="role" onChange={onInputCHange}>
                <option defaultValue>Please select role permission</option>
                <option value="Administrator">Administrator</option>
                <option value="Approver">Approver</option>
                <option value="Editor">Editor</option>
              </select>
            </div>

            <div className="d-grid gap-2">
              <input type="submit" className="btnSubmit" value="Register user" />
            </div>
          </form>
 */
