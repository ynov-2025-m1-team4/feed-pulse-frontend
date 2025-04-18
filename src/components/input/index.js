import style from "./style.module.scss"

const Input = ({ label, type, placeholder,name,value }) => {
    return (
        <div className={style.parent}>
            <label htmlFor={label}>{label}</label>
            <input type={type} placeholder={placeholder} name={name} value={value}/>
        </div>
    );
}

export default Input;