import { useState } from "react";
import { Navbar } from "../../components/admin/ui/Navbar";
import "../../style/pages/admin/admin.css"

export const Admin = () => {
  const [message, setMessage] = useState('')

  const sendNotifications = async(event) => {
    event.preventDefault()
    const notification = new Notification("New Notification", {
      body:message,
      timestamp: new Date(),
      icon: "logo.jpg"
    })
    setMessage("")
    return notification
    
  }

  return (
    <div>
      <Navbar />
      <div className="notification-box">
        <h3>Notification</h3>
        <form className="notification-form" onSubmit={sendNotifications}>
          <textarea name="message" value={message} onChange={event => setMessage(event.target.value)}/>
          <button className="btn btn-create" type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};