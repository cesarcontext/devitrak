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