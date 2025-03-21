import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith("/admin")) {
      document.body.classList.add("admin-bg");
      document.body.classList.remove("user-bg");
    } else {
      document.body.classList.add("user-bg");
      document.body.classList.remove("admin-bg");
    }

    return () => {
      document.body.classList.remove("admin-bg", "user-bg");
    };
  }, [location.pathname]);

  return <div>{children}</div>;
};


