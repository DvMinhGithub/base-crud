import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { selectAuth } from "../features/auth/login.slice";
import { getCookieValue } from "./cookies";

const PUBLIC_ROUTES = ["/login"];

type Props = {
  children: React.ReactNode;
};

const ProtectedComponents = ({ children }: Props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;

  const [isRender, setIsRender] = useState(false);

  const { user } = useAppSelector(selectAuth);
  const token = getCookieValue("access_token");

  useEffect(() => {
    if (token) {
      if (pathname === "/login") {
        navigate("/");
      } else {
        navigate("/");
        setIsRender(true);
      }
    } else {
      if (!PUBLIC_ROUTES.includes(pathname)) {
        navigate("/login");
      } else {
        setIsRender(true);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, token, user]);

  return <>{isRender ? children : null}</>;
};

export default ProtectedComponents;
