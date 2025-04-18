import { useState } from "react";
import styles from "./style.module.scss";

const Index = ({ message, type }) => {
  const [visible, setVisible] = useState(true);
  const [disappearing, setDisappearing] = useState(false);

  const handleClose = () => {
    setDisappearing(true); // joue l'animation
    setTimeout(() => {
      setVisible(false); // supprime le message après l'anim
    }, 300); // durée de l'animation
  };

  if (!visible) return null;

  return (
    <div
      className={`
        ${styles.wrapper} 
        ${styles[type]} 
        ${styles.btnDe} 
        ${disappearing ? styles.disappear : ""}
      `}
    >
      <p>{message}</p>
      <button
        type="button"
        className="btn-close"
        aria-label="Close"
        onClick={handleClose}
      >
        X
      </button>
    </div>
  );
};

export default Index;
