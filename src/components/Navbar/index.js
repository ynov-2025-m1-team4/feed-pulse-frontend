'use client';
import { IoHomeSharp } from "react-icons/io5";
import { CgLoadbarSound } from "react-icons/cg";
import { FaUser } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import MenuItem from "@/components/MenuItem";
import Button from "@/components/Button";
import style from "./index.module.scss";
import { logout } from "@/actions/auth/";

const Index = () => {

    const menu = [
        {
            label: "Dashboard",
            path: "/",
            icon: IoHomeSharp
        },
        {
            label: "Metrics",
            path: "/metrics",
            icon: CgLoadbarSound
        },
        {
            label: "Profil",
            path: "/dashboard/profil",
            icon: FaUser
        }
    ]

    return (
        <aside className={style.sidebar}>
            <nav>
                <ul>
                    {
                        menu.map((itemMenu, index) => (
                            <MenuItem key={index} item={itemMenu } />
                        ))
                    }
                </ul>
            </nav>
            <div className={style.sidebar__bottom}>
                <form action={logout}>
                    <Button
                        label="log out"
                        type="submit"
                        classes="btn__primary with__icon"
                        icon={MdLogout}
                        iconPosition="left"
                    />
                </form>
            </div>
        </aside>
    )
}

export default Index;