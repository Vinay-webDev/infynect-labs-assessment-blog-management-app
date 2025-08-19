// app/ClientLayout.jsx
"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar.jsx";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const hideNavbarRoutes = ["/login", "/register"];
  const shouldHideNavbar = hideNavbarRoutes.includes(pathname);

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      {children}
    </>
  );
}
