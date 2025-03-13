import { createContext, useContext, useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [notification, setNotification] = useState({
    message: "",
    type: "",
    show: false,
  });

  const showNotification = (message, type = "success") => {
    setNotification({ message, type, show: true });

    // Hide notification after 3 seconds
    setTimeout(() => {
      setNotification({ message: "", type: "", show: false });
    }, 3000);
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <ToastContainer position="top-end" className="p-3 mt-5">
        <Toast
          show={notification.show}
          bg={notification.type}
          onClose={() => setNotification({ ...notification, show: false })}
        >
          <Toast.Body className="text-white">{notification.message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  return useContext(NotificationContext);
}
