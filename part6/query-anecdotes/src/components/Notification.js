import NotificationContext from "../NotifcationContext";
import { useContext } from "react";

const Notification = () => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };
  const [message, messageDispatch] = useContext(NotificationContext);

  if (!message) return null;

  return <div style={style}>{message}</div>;
};

export default Notification;
