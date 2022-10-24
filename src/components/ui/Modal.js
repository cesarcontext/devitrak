import React, { useMemo } from "react";
import Modal from "react-modal";
import Swal from "sweetalert2";
import { devitrackApiAdmin } from "../../apis/devitrackApi";
import { useForm } from "../../hooks/useForm";

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

const adminUserRegistration = {
  fullName: "",
  email: "",
  password: "",
  password2: "",
  role: "",
};
// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");

export const ModalAdminNewUser = ({ modalState, setModalState }) => {
  const { fullName, email, password, password2, role, onInputCHange } = useForm(
    adminUserRegistration
  );

  function closeModal() {
    setModalState(false);
  }
  const validationName = useMemo(() => {
    return adminUserRegistration.fullName.length > 0 ? "" : "is-invalid";
  }, [adminUserRegistration.fullName]);

  const validationPassword = useMemo(() => {
    return adminUserRegistration.password.length > 0 ? "" : "is-invalid";
  }, [adminUserRegistration.password]);

  const validationEmail = useMemo(() => {
    return adminUserRegistration.email.length > 3 &&
      adminUserRegistration.email
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
      ? ""
      : "is-invalid";
  }, [adminUserRegistration.email]);

  const handleNewAdminUserRegistration = async (event) => {
    event.defaultPrevent();
    console.log(adminUserRegistration)
    closeModal()
    /**
     * if(validationName === "is-invalid"){
        alert("Fullname must be provided");
      return;
    }
    if(validationEmail === "is-invalid"){
        alert("Please provide a valid email address")
    }
    if(validationPassword === "is-invalid"){
        alert("Please provide password");
      return;
    }
    if (password !== password2) {
      Swal.fire("error", "Passwords must match", "error");
      return;
    } else {
      try {
        const { data } = await devitrackApiAdmin.post("/new_admin_user", {
          name: fullName,
          email: email,
          password: password,
          role: role,
        });
        console.log(data)
        if (data) {
          Swal.fire({
            text: "Admin User Registered",
            icon: "success",
          });
          console.log(adminUserRegistration);
        }
      } catch (error) {
        console.log(error);
      }
    }
     */
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
          <h2>
            Create New Admin User
          </h2>

          <form
            onSubmit={handleNewAdminUserRegistration}
            className="form-container-registration-admin-user"
          >
            <div className="form-input-registration-admin-user">
              <input
                name="fullName"
                onChange={onInputCHange}
                value={fullName}
                type="text"
                placeholder="Full name"
              />
            </div>
            <div className="form-input-registration-admin-user">
              <input
                name="email"
                onChange={onInputCHange}
                value={email}
                type="emai"
                placeholder="Email"
              />
            </div>
            <div className="form-input-registration-admin-user">
              <input
                name="password"
                onChange={onInputCHange}
                value={password}
                type="password"
                placeholder="Password"
              />
            </div>
            <div className="form-input-registration-admin-user">
              <input
                name="password2"
                onChange={onInputCHange}
                value={password2}
                type="password"
                placeholder="Repeat Password"
              />
            </div>
            <div className="form-input-registration-admin-user">
              <select onChange={onInputCHange}>
                <option defaultValue>Please select role permission</option>
                <option value="Administrator">Administrator</option>
                <option value="Approver">Approver</option>
                <option value="Editor">Editor</option>
              </select>
            </div>
            <div
              style={{
                display: "flex",
              }}
            >
              <button onClick={closeModal}>cancel</button>
              <button type="submit">Save</button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};
