"use client";

import { useActionState, useEffect, useState } from "react";
import { addData } from "../../../app/action/data";
import Input from "../../input";
import Button from "../../button/index";
import style from "./style.module.scss";
import Notification from "../../popUp/index";

const initialState = {
  error: "",
};

const Page = () => {
  const [state, formAction, pending] = useActionState(addData, initialState);
  const [show, setShow] = useState(true);
  console.log(state.error);

  useEffect(() => {
    if (state?.message) {
       if (state?.error && state.redirect) {
      window.location.href = state.redirect;
    }
      setShow(true);
    }
  }, [state]);

  const handleClose = () => {
    setShow(false);
  };

  return (
    <>
      <div className={style.parent}>
        <div className={style.sous_parent}>
          <div className={style.formHeader}>
            <h3>Ajouter le lien</h3>
          </div>

          <form action={formAction}>
            <Input label="Lien" type="data" name="data" />
            <Button
              label={pending ? "Enregistrement..." : "Ajouter"}
              type="submit"
            />
            <div
              className={`${style.btnDe} ${
                state?.error ? style.error : style.success
              }`}
            >
              {state?.message && show && (
                <Notification
                  message={state.message}
                  type={state.error ? "error" : "success"}
                  visible={show}
                />
              )}
              {state?.message && show && (
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={handleClose}
                >
                  
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Page;
