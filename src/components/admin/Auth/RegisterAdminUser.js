import { useEffect } from "react";
import Swal from "sweetalert2";
import { swalErrorMessage } from "../../../helper/swalFireMessage";
import { useAdminStore } from "../../../hooks/useAdminStore";
import { useForm } from "../../../hooks/useForm";
import "../../../style/pages/admin/login.css"
const registerFormFields = {
  registerName: "",
  registerEmail: "",
  registerPassword: "",
  registerPassword2: "",
  registerSecretQuestion: "",
  registerSecretAnswer: "",
};

export const RegisterAdminUser = () => {
  const { errorMessage, startRegister } = useAdminStore();

  const {
    registerName,
    registerEmail,
    registerPassword,
    registerPassword2,
    registerSecretQuestion,
    registerSecretAnswer,
    onInputCHange: onRegisterInputChange,
  } = useForm(registerFormFields);

  const onSubmitRegister = (event) => {
    event.preventDefault();

    if (registerPassword !== registerPassword2) {
      swalErrorMessage("Passwords must match");
      return;
    } else {
      startRegister({
        name: registerName,
        email: registerEmail,
        password: registerPassword,
        question: registerSecretQuestion,
        answer: registerSecretAnswer.toLowerCase().trim(),
      });
    }
  };

  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire("Incorrect credentials", errorMessage, "error");
    }
  }, [errorMessage]);

  return (
    <div className="container login-container">
        <div className="col-md-6 login-form-2">
          <h3>Register</h3>
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
            <div className="form-group mb-2">
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
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Provide an answer"
                name="registerSecretAnswer"
                value={registerSecretAnswer}
                onChange={onRegisterInputChange}
              />
            </div>

            <div className="d-grid gap-2">
              <input
                type="submit"
                className="btnSubmit"
                value="Register user"
              />
            </div>
          </form>
        </div>
    </div>
  );
};
