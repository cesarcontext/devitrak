import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { devitrackApi } from "../../../apis/devitrackApi";

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)

export const SendNotification = ({
  displayNotification,
  setDisplayNotification,
}) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  if (displayNotification !== false) {
    Modal.setAppElement("#root");
  }
  function closeModal() {
    setDisplayNotification(false);
  }
  const handleResize = () => {
    setScreenSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  const customeStyleBaseOnScreenSize = () => {
    let customStyles;
    if (screenSize.width > 1440) {
      return (customStyles = {
        content: {
          width: "20vw",
          height: "45vh",
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          outline:"1px solid black"
        },
      });
    }
    if (screenSize.width > 1024 && screenSize.width < 1441) {
      return (customStyles = {
        content: {
          width: "25vw",
          height: "45vh",
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          outline:"1px solid black"
        },
      });
    }
    if (screenSize.width < 1025) {
      return (customStyles = {
        content: {
          width: "35vw",
          height: "35vh",
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          outline:"1px solid black"
        },
      });
    }
  };

  useEffect(() => {
    handleResize();
  }, []);

  const handleNotification = async () => {
    const response = await devitrackApi.post("/notification/new-message", {
        title: title,
        body: body
    })
    if(response){
      alert("Notification sent!")
    }
    closeModal()
  };

  return (
    <div>
      <Modal
        isOpen={displayNotification}
        onRequestClose={closeModal}
        style={customeStyleBaseOnScreenSize()}
        shouldCloseOnOverlayClick={false}
      >
        <form>
            <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                <h3>Notification</h3>
                <hr/>
            </div>
          
          <br/>
          <div className={`form-control ${title === "" ? "is-invalid" : ""}`}>
            <input
              style={{border:"none", borderBottom:"solid 1px var(--main-colorsen)", outline:"none"}}
              placeholder="Title"
              name="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>
          <br />
          <div className={`form-control ${body === "" ? "is-invalid" : ""}`}>
            <textarea
              style={{border:"none", borderBottom:"solid 1px var(--main-colorsen)", outline:"none", width:"100%"}}
              placeholder="Notification"
              name="body"
              value={body}
              onChange={(event) => setBody(event.target.value)}
            />
          </div>
          <br/>
          <div style={{width:"100%", display:"flex", justifyContent:"space-evenly", alignItems:"center"}}>
            <button className="btn btn-delete" style={{width:"25%"}} onClick={event => setDisplayNotification(false)}>Cancel</button>
          <button className="btn btn-create" style={{width:"25%"}} onClick={handleNotification}>Send</button>
          </div>
          
        </form>
      </Modal>
    </div>
  );
};
