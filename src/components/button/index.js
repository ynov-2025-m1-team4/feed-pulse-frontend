import style from "./index.module.scss";
const Index = ({ label, handleClik, type, disable }) => {
  return (
    <button
    className={`${style.btn}Primary`}
      onClick={handleClik}
      type={type}
      disabled={disable}
      alt={label}
    >
      <div>{label}</div>
    </button>
    // <img src={icon} alt=""/>
  );
};

export default Index;
