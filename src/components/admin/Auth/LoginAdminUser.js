import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useAdminStore } from "../../../hooks/useAdminStore";
import { useForm } from "../../../hooks/useForm";
import {ModalUpdatePassword} from "../ui/ModalUpdatePassword"
import "../../../style/pages/admin/login.css"
const loginFormFields = {
  loginEmail: "",
  loginPassword: "",
};

export const LoginAdminUser = () => {
  const { startLogin, errorMessage } = useAdminStore();
  const [updatePasswordModalState, setUpdatePasswordModalState] =
    useState(false);

  const {
    loginEmail,
    loginPassword,
    onInputCHange: onloginInputChange,
  } = useForm(loginFormFields);

  const onSubmitLogin = (event) => {
    event.preventDefault();

    startLogin({ email: loginEmail, password: loginPassword });
  };

  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire("Incorrect credentials", errorMessage, "error");
    }
  }, [errorMessage]);

  const updatePasswordFunction = async () => {
    setUpdatePasswordModalState(true);
  };

  return (
    <div className="container login-container">
        <div className="col-md-6 login-form-1">
          <h3>Sign In</h3>
          <form onSubmit={onSubmitLogin}>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Email"
                name="loginEmail"
                value={loginEmail}
                onChange={onloginInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                name="loginPassword"
                value={loginPassword}
                onChange={onloginInputChange}
              />
            </div>
            <div className="d-grid gap-2">
              <input type="submit" className="btnSubmit" value="Login" />
            </div>
            <p className="forgot-link" onClick={updatePasswordFunction}>
              Forgot the password? Click here!
            </p>
          </form>
        </div>
      <ModalUpdatePassword
        updatePasswordModalState={updatePasswordModalState}
        setUpdatePasswordModalState={setUpdatePasswordModalState}
      />
    </div>
  );
};
