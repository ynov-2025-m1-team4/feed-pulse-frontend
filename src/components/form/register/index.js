"use client";

import { useActionState, useEffect, useState } from "react";
import { register } from "../../../app/action/auth";
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
  const [state, formAction, pending] = useActionState(register, initialState);
  const [show, setShow] = useState(true);

  useEffect(() => {
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
            <h1>Register</h1>
          </div>

          <form action={formAction}>
            <Input label="Nom" type="text" name="name" />
            <Input label="Email" type="email" name="email" />
            <Input label="Password" type="password" name="password" />
            <Input
              label="Confirm Password"
              type="password"
              name="confirm_password"
            />
            <Button
              label={pending ? "Enregistrement..." : "Register"}
              type="submit"
            />
            <div
              className={`${style.btnDe} ${
                state?.success ? style.success : style.error
              }`}
            >
              {state?.message && show && (
                <Notification
                  message={state.message}
                  type={state.success ? "success" : "error"}
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
                  X
                </button>
              )}
            </div>

            <p className="my__10">
              Vous n&apos;avez pas de compte ?{" "}
              <Link href="/auth/login" className={style.link}>Connectez-vous</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Page;
