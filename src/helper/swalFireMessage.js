import Swal from "sweetalert2";

export const swalErrorMessage = (error) => {
  Swal.fire({
    title: "Upss something went wrong!!",
    width: 600,
    padding: "3em",
    text: `${error}`,
    icon: "error",
    color: "#rgb(30, 115, 190)",
    background: "#fff",
    confirmButtonColor: "rgb(30, 115, 190)",
    backdrop: `
      rgb(30, 115, 190)
        url("../image/logo.jpg")
        left top
        no-repeat
      `,
  });
};

export const rightDoneMessage = (str) => {
  Swal.fire({
    title: "",
    width: 600,
    padding: "3em",
    text: `${str}`,
    icon: "success",
    color: "#rgb(30, 115, 190)",
    background: "#fff",
    confirmButtonColor: "rgb(30, 115, 190)",
    backdrop: `
      	rgb(30, 115, 190)
        	url("../image/logo.jpg")
        	left top
        	no-repeat
      	`,
  });
};


export const NewUserCreatedMessage = () => {
  Swal.fire({
    title: "",
    width: 600,
    padding: "3em",
    text: `Your account was created`,
    icon: "success",
    color: "#rgb(30, 115, 190)",
    background: "#fff",
    confirmButtonColor: "rgb(30, 115, 190)",
    backdrop: `
      	rgb(30, 115, 190)
        	url("../image/logo.jpg")
        	left top
        	no-repeat
      	`,
  });
};

export const deviceMessageAlert = () => {
  Swal.fire({
    title: "",
    width: 600,
    padding: "3em",
    text: `For more than 5 devices, please contact Staff.`,
    icon: "success",
    color: "#rgb(30, 115, 190)",
    background: "#fff",
    confirmButtonColor: "rgb(30, 115, 190)",
    backdrop: `
      	rgb(30, 115, 190)
        	url("../image/logo.jpg")
        	left top
        	no-repeat
      	`,
  });
}

export const swalAlertMessage = (error) => {
  Swal.fire({
    title: `${error}`,
    width: 600,
    padding: "3em",
    icon: "error",
    color: "#rgb(30, 115, 190)",
    background: "#fff",
    confirmButtonColor: "rgb(30, 115, 190)",
    backdrop: `
      rgb(30, 115, 190)
        no-repeat
      `,
  });
};
