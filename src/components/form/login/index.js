"use client";

import { useActionState, useEffect, useState } from "react";
import { login } from "../../../app/action/auth";
import Input from "../../input";
import Button from "../../button/index";
import style from "./style.module.scss";
import Notification from "../../popUp/index";
import BootStrapt from "../../Bootstrap/BootstrapClient";
import Link from "next/link";

const initialState = {
  error: "",
};

const Page = () => {
  const [state, formAction, pending] = useActionState(login, initialState);
  const [show, setShow] = useState(true);
console.log(state.error);

  useEffect(() => {
    console.log(`les message de login,${state?.message}, erreur ${state?.error}, redirection ${state.redirect}`);
    if (!state?.error && state.redirect) {
      window.location.href = state.redirect;
  }
    if (state?.message) {
      setShow(true);
    }
  }, [state]);

  const handleClose = () => {
    setShow(false);
  };

  return (
    <>

      <BootStrapt />
      <div className={style.parent}>
        <div className={style.sous_parent}>
          <div className={style.formHeader}>
            <h1>FEED PULSE</h1>
            <h1>Connexion</h1>
          </div>

          <form action={formAction}>
            <Input label="Email" type="email" name="email" />
            <Input label="Password" type="password" name="password" />
            <Button
              label={pending ? "Enregistrement..." : "Connexion"}
              type="submit"
            />
            <div
              className={`${style.btnDe} ${
                state?.error ?  style.error: style.success
              }`}
            >
              {state?.message && show && (
                <Notification
                  message={state.message}
                  type={state.error ? "error":"success" }
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

            <p className="my__10">
              Vous n&apos;avez pas de compte ?{" "}
              <Link href="/auth/register" className={style.link}>
                Inscrivez-vous
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Page;
