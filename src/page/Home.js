import React, { useState } from "react";
import { useStytch } from "@stytch/stytch-react";
import Swal from "sweetalert2";
import { useContactInfoStore } from "../hooks/useContactInfoStore";


export const Home = () => {
  const [email, setEmail] = useState("");
  const client = useStytch();
  const { startCheckingUser } = useContactInfoStore()

  
  const handleLogin = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    startCheckingUser( event )
    await client.magicLinks.email.loginOrCreate(email);
    Swal.fire({
      title: `An email has been sent to ${ email }`,
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
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: "5%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>
          <h3>Start your session with your email</h3>
          <form onSubmit={handleLogin}>
            <input
              style={{
                width: "100%",
                textAlign: "center",
              }}
              onChange={(event) => setEmail(event.target.value)}
              className="input"
              type="email"
              name="email"
              placeholder="e.g. example@example.com"
            />
            <button>Login</button>
          </form>
        </div>

        {/* <div>
          <ContactInfo />
        </div> */}
      </div>
    </div>
  );
};
