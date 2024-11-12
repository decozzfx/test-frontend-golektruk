import { useState, useEffect, useCallback } from "react";
import ReactDOM from "react-dom";

const Soal5 = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  // Function to handle the back button
  const handleBackButton = useCallback(() => {
    if (openModal) {
      setOpenModal(false);
    }
  }, [openModal]);

  useEffect(() => {
    // Listen for popstate event
    window.addEventListener("popstate", handleBackButton);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, [handleBackButton, openModal]);

  const toggleModal = () => {
    setOpenModal((prev) => !prev);
    // Push a new state to the history stack when opening the modal
    if (!openModal) {
      window.history.pushState({}, "");
    } else {
      // If closing the modal, go back to the previous state
      window.history.back();
    }
  };

  return (
    <>
      <div style={{ margin: "1rem" }}>
        {openModal && <Modal />}
        <button
          style={{ padding: "2px 4px", background: "white" }}
          onClick={toggleModal}
        >
          {openModal ? "close" : "open"} modal
        </button>
      </div>

      {/* Ekspektasi hasil */}
      <iframe
        src="/soal5.mp4"
        style={{
          position: "fixed",
          bottom: 0,
          right: 0,
          border: "1px solid white",
        }}
      ></iframe>
    </>
  );
};

const Modal = () => {
  const modalRoot = document.getElementById("modal-root");

  if (!modalRoot) return <></>;
  return ReactDOM.createPortal(
    <section
      style={{
        background: "#8f9cb0",
        padding: "3rem",
        position: "fixed",
        margin: "6rem",
      }}
    >
      <div>This is modal</div>
    </section>,
    modalRoot
  );
};

export default Soal5;
