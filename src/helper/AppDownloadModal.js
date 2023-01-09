import { useEffect } from "react";
import { useState } from "react";
import { Modal } from "react-bootstrap";

export function AppDownloadModal() {
  const [showModal, setShowModal] = useState(false);
  const [hasPermission, setHasPermission] = useState(null)
  const handleClose = () => setShowModal(false);
  useEffect(() => {
    if (Notification.permission === "default") {
      setTimeout(() => {
        setShowModal(true);
      }, 2000);
    }
  }, []);

  async function requestNotificationPermission() {
    try {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        setHasPermission(true);
        setShowModal(false);
      } else {
        setHasPermission(false);
        setShowModal(false);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Notifications?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          The Devitrack app wants to request your permission to send you
          notifications.
          <br />
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-create"
            onClick={() => requestNotificationPermission()}
          >
            Select Notification options
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}