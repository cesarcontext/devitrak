import { useEffect, useState } from "react";
import { devitrackApi } from "../../apis/devitrackApi";
import { Navbar } from "../../components/admin/ui/Navbar";

export const Admin = () => {
  const [message, setMessage] = useState('')
  const [userPermisssion, setUserPermisssion] = useState([]);
  const getUserPermissionResponse = async () => {
    const response = await devitrackApi.get("/auth/users");
    if (response) {
      setUserPermisssion(response.data.users);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    getUserPermissionResponse();
    return () => {
      controller.abort();
    };
  }, []);

  const sendNotifications = async(event) => {
    event.preventDefault()
    const notification = new Notification("New Notification", {
      body:message,
      timestamp: new Date(),
      icon: "../image/logo.jpg"
    })
    return notification
  }

  return (
    <div>
      <Navbar />
      <div>
        <h3>Notification</h3>
        <form onSubmit={sendNotifications}>
          <textarea name="message" value={message} onChange={event => setMessage(event.target.value)}/>
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};