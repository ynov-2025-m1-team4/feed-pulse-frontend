"use client";

import Link from "next/link";
import Button from "../../components/button/index";
import { logout } from "../../app/action/auth";
import { useActionState,useEffect } from "react";
import { usePathname } from "next/navigation";

const initialState = {
  message: "",
};

export default function SimpleFeedPulseDashboard() {
  const pathname = usePathname();

  const [state, formAction, pending] = useActionState(logout, initialState);
  useEffect(() => {
    console.log(state);
    
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
    console.log("URL actuelle :", pathname);
    // getUser()
    //   .then((response) => {
    //     console.log("User data:", response.user);
    //     setUser(response.user);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching user data:", error);
    //     setError("Failed to fetch user data");
    //   });
  }, [pathname]);
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="flex flex-1">
        <aside className="w-48 bg-white shadow-md">
          <nav className="py-6">
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="block px-6 py-3 text-gray-700 hover:bg-gray-100"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/Dashboard/metrics"
                  className="block px-6 py-3 text-gray-700 "
                >
                  Metrics
                </Link>
              </li>
              <li>
                <Link
                  href="/Dashboard/profil"
                  className="block px-6 py-3 text-gray-700 hover:bg-gray-100"
                >
                  Profil
                </Link>
              </li>
              <li className="border-t border-gray-200 mt-6 pt-4">
                <form action={logout}>
                  <Button
                    className="block px-6 py-3 bg-gray-800 text-white"
                    label={pending ? "LOGOUT..." : "LOGOUT"}
                    type="submit"
                  />
                </form>
              </li>
            </ul>
          </nav>
        </aside>
      </div>
    </div>
  );
}
