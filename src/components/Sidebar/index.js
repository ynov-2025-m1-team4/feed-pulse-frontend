'use client';
import HomeIcon from "../../../public/home.svg";
import BarsIcon from "../../../public/bars.svg";
import UserIcon from "../../../public/user.svg";
import FrameIcon from "../../../public/frame.svg";
import MenuItem from "@/components/MenuItem";
/* import Button from "@/components/Button"; */
import style from "./index.module.scss";
/* import { logout } from "@/actions/auth/"; */

const Index = () => {

    const menu = [
        {
            label: "Dashboard",
            path: "/",
            icon: HomeIcon.src
        },
        {
            label: "Metrics",
            path: "/metrics",
            icon: BarsIcon.src
        },
        {
            label: "Profil",
            path: "/dashboard/profil",
            icon: UserIcon.src
        }
    ]

    return (
        <div className={style.sidebar}>
            <h1>FEED PULSE</h1>
            <nav>
                <ul className={style.nav}>
                    {
                        menu.map((itemMenu, index) => (
                            <MenuItem key={index} item={itemMenu } />
                        ))
                    }
                </ul>
            </nav>
            <button
                className={style.logout}
                icon={FrameIcon.src}
                iconPosition="left"
            >
                <img src={FrameIcon.src} alt="logout" />
                <span>LOGOUT</span>
            </button>
        </div>
    )
}

export default Index;