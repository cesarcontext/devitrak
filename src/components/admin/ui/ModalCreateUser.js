import React, { useEffect, useMemo, useState } from "react";
import Modal from "react-modal";
import Swal from "sweetalert2";
import { devitrackApi } from "../../../apis/devitrackApi";
import { useAdminStore } from "../../../hooks/useAdminStore";
import { useForm } from "../../../hooks/useForm";
import "../../../style/component/admin/ui/CreateUserModal.css";

const initalFormValues = {
  groupName: "",
  name: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  category: "",
  privacyPolicy: true,
};
// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)

export const ModalCreateUser = ({ createUserButton, setCreateUserButton }) => {
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const { errorMessage } = useAdminStore();
  const {
    groupName,
    name,
    lastName,
    email,
    phoneNumber,
    privacyPolicy,
    category,
    onInputCHange: onRegisterInputChange,
  } = useForm(initalFormValues);

  if (createUserButton !== false) {
    Modal.setAppElement("#root");
  }
  function closeModal() {
    setCreateUserButton(false);
  }
  const handleResize = () => {
    setScreenSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  const customeStyleBaseOnScreenSize = () => {
    let customStyles;
    if(screenSize.width < 1201){
      return customStyles = {
        content: {
          width: "50vw",
          height: "45vh",
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
        }
      };
    } else {
      return customStyles = {
        content: {
          width: "20vw",
          height: "45vh",
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
        }
      };
    }
  }
  customeStyleBaseOnScreenSize()

  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire("Incorrect credentials", errorMessage, "error");
    }
    handleResize();
  }, [errorMessage]);

  const validationName = useMemo(() => {
    return name.length > 0 ? "" : "is-invalid";
  }, [name]);

  const validationLastName = useMemo(() => {
    return lastName.length > 0 ? "" : "is-invalid";
  }, [lastName]);

  const validationEmail = useMemo(() => {
    return email.length > 3 &&
      email
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
      ? ""
      : "is-invalid";
  }, [email]);

  const validationPhoneNumber = useMemo(() => {
    return phoneNumber.length > 4 ? "" : "is-invalid";
  }, [phoneNumber]);

  const onSubmitRegister = async (event) => {
    event.preventDefault();
    if (validationName === "is-invalid") {
      return Swal.fire({
        title: "",
        text: "Name must be provided",
        icon: "error",
        confirmButtonColor: "rgb(30, 115, 190)",
      });
    }
    if (validationLastName === "is-invalid") {
      return Swal.fire({
        title: "",
        text: "Last name must be provided",
        icon: "error",
        confirmButtonColor: "rgb(30, 115, 190)",
      });
    }
    if (validationEmail === "is-invalid") {
      return Swal.fire({
        title: "",
        text: "Email must be provided",
        icon: "error",
        confirmButtonColor: "rgb(30, 115, 190)",
      });
    }
    if (validationPhoneNumber === "is-invalid") {
      return Swal.fire({
        title: "",
        text: "Phone number must be provided",
        icon: "error",
        confirmButtonColor: "rgb(30, 115, 190)",
      });
    }

    try {
      const { data } = await devitrackApi.post("/auth/new", {
        groupName,
        name,
        lastName,
        email,
        phoneNumber,
        category,
        privacyPolicy,
      });
      alert("New user created succesfully");
      if (data) closeModal();
    } catch (error) {
      console.log(
        "🚀 ~ file: ModalCreateUser.js ~ line 136 ~ onSubmitRegister ~ error",
        error
      );
      alert(error);
    }
  };
  return (
    <div>
      <Modal
        isOpen={createUserButton}
        onRequestClose={closeModal}
        style={customeStyleBaseOnScreenSize()}
        shouldCloseOnOverlayClick={false}
      >
        <div
          style={{
            textAlign: "center",
          }}
        >
          <h2>Create New User</h2>

          <form
            style={{
              margin: "auto",
            }}
            className="form-container"
            onSubmit={onSubmitRegister}
          >
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                name="name"
                value={name}
                onChange={onRegisterInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Lastname"
                name="lastName"
                value={lastName}
                onChange={onRegisterInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                name="email"
                value={email}
                onChange={onRegisterInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="number"
                className="form-control"
                placeholder="Phone"
                name="phoneNumber"
                value={phoneNumber}
                onChange={onRegisterInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Company"
                name="groupName"
                value={groupName}
                onChange={onRegisterInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <select
                type="text"
                className="form-control"
                name="category"
                onChange={onRegisterInputChange}
              >
                <option value="Regular">Regular</option>
                <option value="Corporate">Corporate</option>
              </select>
            </div>

            <div className="form-group mb-2"></div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <button className="btn btn-delete" onClick={closeModal}>
                  Cancel
                </button>
              </div>
              <div>
                <button className="btn btn-create" type="submit">
                  Register
                </button>
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};
