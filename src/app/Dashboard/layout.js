import SaidBar from "../../components/Sidbar";
import DataForm from "../../components/form/addData";
import styles from "./layout.module.scss";

export default function Layout({ children }) {
    return (
        <>
            <div className={styles.parent}>
                     <SaidBar />
                     <div className={styles.modal} >
                       <div className={styles.modalBtn}>
                       <button
                         type="button"
                         className="btn btn-primary"
                         data-bs-toggle="modal" // Assurez-vous d'utiliser data-bs-toggle pour Bootstrap 5
                         data-bs-target="#exampleModal" // Assurez-vous d'utiliser data-bs-target pour Bootstrap 5
                       >
                         Add Data
                       </button>
                       </div>
                       <div
                         className="modal fade"
                         id="exampleModal"
                         tabIndex={-1}
                         aria-labelledby="exampleModalLabel"
                         aria-hidden="true"
                       >
                         <div className="modal-dialog">
                           <div className="modal-content">
                             <div className="modal-header">
                               <button
                                 type="button"
                                 className="btn-close"
                                 data-bs-dismiss="modal" // Assurez-vous d'utiliser data-bs-dismiss pour Bootstrap 5
                                 aria-label="Close"
                               ></button>
                             </div>
                             <div className="modal-body">
                               <DataForm/>
                             </div>
                            
                           </div>
                         </div>
                       </div>
                       {children}
                     </div>
                   </div>
        </>
    )
}