import { useState } from "react";
import image from "../images/contact.jpg";
import { Typography, Button } from "@mui/material";
import Modal from "react-modal";

const Contact = () => {
  const [isOpen, setIsOpen] = useState(false);

  const PopupContent = ({ onClose }) => {
    return (
      <div>
        <Typography
          variant="body1"
          sx={{ right: 0, bottom: 0, textAlign: "middle" }}
        >
          Your feedback has been recieved. Thank you
        </Typography>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <Button variant="contained" onClick={onClose}>
            close
          </Button>
        </div>
      </div>
    );
  };

  const openPopup = () => {
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault;
    openPopup();
  };

  const customModalStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      width: "300px",
      padding: "20px",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
  };

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundImage: `url(${image})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "fixed",
    },
    formContainer: {
      padding: "20px",
      width: "400px",
      backgroundColor: "white",
      opacity: "0.8",
      borderRadius: "5px",
      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
    },
    heading: {
      textAlign: "center",
      marginBottom: "2rem",
      color: "#333",
    },
    inputLabel: {
      marginBottom: "0.5rem",
      color: "#333",
    },
    inputField: {
      padding: "0.5rem",
      marginBottom: "1rem",
      border: "none",
      borderBottom: "2px solid #ccc",
      fontSize: "1rem",
    },
    textArea: {
      padding: "0.5rem",
      marginBottom: "1rem",
      border: "2px solid #ccc",
      fontSize: "1rem",
      resize: "none",
      minHeight: "100px",
    },
    submitButton: {
      padding: "0.5rem 1rem",
      backgroundColor: "#0077cc",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "1rem",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h1 style={styles.heading}>Contact Us</h1>
        <form>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label htmlFor="name" style={styles.inputLabel}>
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              style={styles.inputField}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label htmlFor="email" style={styles.inputLabel}>
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              style={styles.inputField}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label htmlFor="message" style={styles.inputLabel}>
              Message:
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              style={styles.textArea}
            />
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            style={styles.submitButton}
          >
            Submit
          </button>
        </form>
      </div>
      <Modal
        isOpen={isOpen}
        onRequestClose={closePopup}
        contentLabel="Popup"
        style={customModalStyles}
      >
        <PopupContent onClose={closePopup} />
      </Modal>
    </div>
  );
};

export default Contact;
