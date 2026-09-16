"use client";

import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase/client";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/portal/login");
    router.refresh();
  };

  return (
    <button type="button" className="btn btn-ghost" onClick={handleLogout}>
      Log out
    </button>
  );
}
