import React, { useState } from "react";
import { useStytch } from "@stytch/stytch-react";
import Swal from "sweetalert2";

export const MagicLink = ({formValues}) => {
    const client = useStytch();
  
    const handleLogin = async (formValues) => {
        formValues.preventDefault();
        formValues.stopPropagation();
    
        await client.magicLinks.email.loginOrCreate(formValues.email);

        Swal.fire({
          title: `An email has been sent to ${ formValues.email }`,
          confirmButtonColor: "rgb(30, 115, 190)",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });
      };


  return (
    <form onSubmit={handleLogin}>
        <h4>Your email is already registered, please sign in</h4>
    <span>{formValues.email}</span>
    <button>Login</button>
  </form>
  )
}
