import styles from "./style.module.scss";

const Index = ({ message, type,visible }) => {


  if (!visible) return null;

  return (
    <div
      className={`
        ${styles.wrapper} 
        ${styles[type]} 
        ${styles.btnDe} 
      `}
    >
      <p>{message}</p>

    </div>
  );
};

export default Index;
