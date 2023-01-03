import { useEffect } from "react";
import { useState } from "react";
import { Modal } from "react-bootstrap";

export function AppDownloadModal({ onDownload, onClose }) {
  const [showModal, setShowModal] = useState(false);
  const userAgent = navigator.userAgent;

  const handleClose = () => setShowModal(false);
  useEffect(() => {
    setTimeout(() => {
      setShowModal(true);
    }, 2000);
  }, []);

  return (
    <>
      {userAgent.indexOf("Android") !== -1 ? (
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>App Download</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            The app is now available for download on Android. Click the links
            below to download the app.
            <br />
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-delete" onClick={handleClose}>
              Close
            </button>
            <button
              onClick={() => {
                (event) => {
                  window.addEventListener("beforeinstallprompt", () => {
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
              }}
              className="btn btn-create"
            >
              DownLoad App
            </button>{" "}
          </Modal.Footer>
        </Modal>
      ) : (
        ""
      )}
      {userAgent.indexOf("iPhone") !== -1 ||
      userAgent.indexOf("iPad") !== -1 ? (
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>App Download</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            The Devitrack app is now available for download. To install the app,
            click the "Add to Home Screen" button in your browser's menu.
            <br />
            <br />
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-delete" onClick={handleClose}>
              Close
            </button>
          </Modal.Footer>
        </Modal>
      ) : (
        ""
      )}
    </>
  );
}
/**
 * (event) => {
              window.addEventListener("beforeinstallprompt", () => {
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
            }}
 */
