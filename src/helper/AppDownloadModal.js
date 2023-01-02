import { useEffect } from "react";
import { useState } from "react";
import { Modal } from "react-bootstrap";

export function AppDownloadModal({ modalDisplay }) {
  const [showModal, setShowModal] = useState(modalDisplay);

  const handleClose = () => setShowModal(false);
  useEffect(() => {
    setTimeout(() => {
      setShowModal(true);
    }, 2000);
  }, []);

  const handleDownloadApp = async () => {
    window.addEventListener("beforeinstallprompt", (event) => {
      console.log(
        "🚀 ~ file: AppDownloadModal.js:17 ~ window.addEventListener ~ event",
        event
      );

      event.preventDefault();
      const promptEvent = event;
      promptEvent.prompt();
      promptEvent.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("App was installed");
        } else {
          console.log("App was not installed");
        }
      });
    });
  };
  return (
    <>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>App Download</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          The app is now available for download on both iOS and Android. Click
          the links below to download the app.
          <br />
          <br />
          <button onClick={handleDownloadApp} className="btn btn-create">
            DownLoad App
          </button>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-delete" onClick={handleClose}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
