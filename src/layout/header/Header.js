import React, { useEffect } from "react";
import classNames from "classnames";
import Toggle from "../sidebar/Toggle";
import Logo from "../logo/Logo";
import News from "../news/News";
import User from "./dropdown/user/User";
import Notification from "./dropdown/notification/Notification";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useConnect, useSignMessage, useDisconnect, useNetwork } from "wagmi";
import { useMoralis } from "react-moralis";

const Header = ({ fixed, theme, className, setVisibility, ...props }) => {
  const { authenticate, isAuthenticated, isAuthenticating, user, account, logout } = useMoralis();

  const logOut = async () => {
    await logout();
    localStorage.removeItem("accessToken");
    console.log("logged out");
  };

  const { isConnected, address } = useAccount();
  const { chain } = useNetwork();
  const { status } = "unauthenticated";
  const { signMessageAsync } = useSignMessage();
  // const { push } = useRouter();
  const handleSignout = () => {
    localStorage.removeItem("accessToken");
  };
  useEffect(() => {
    const handleAuth = async () => {
      const userData = { address, chain: chain.id, network: "evm" };

      const { data } = await axios.post("/api/auth/request-message", userData, {
        headers: {
          "content-type": "application/json",
        },
      });

      const message = data.message;

      const signature = await signMessageAsync({ message });

      // redirect user after success authentication to '/user' page
      const { url } = await signIn("credentials", {
        message,
        signature,
        redirect: false,
        callbackUrl: "/user",
      });
      /**
       * instead of using signIn(..., redirect: "/user")
       * we get the url from callback and push it to the router to avoid page refreshing
       */
      // push(url);
    };
    if (status === "unauthenticated" && isConnected) {
      handleAuth();
    }
  }, [status, isConnected]);

  const headerClass = classNames({
    "nk-header": true,
    "nk-header-fixed": fixed,
    [`is-light`]: theme === "white",
    [`is-${theme}`]: theme !== "white" && theme !== "light",
    [`${className}`]: className,
  });
  return (
    <div className={headerClass}>
      <div className="container-fluid">
        <div className="nk-header-wrap">
          <div className="nk-menu-trigger d-xl-none ml-n1">
            <Toggle
              className="nk-nav-toggle nk-quick-nav-icon d-xl-none ml-n1"
              icon="menu"
              click={props.sidebarToggle}
            />
          </div>
          <div className="nk-header-brand d-xl-none">
            <h5 style={{ color: "#2D1B24" }}>Invoice Block</h5>
          </div>
          <div className="nk-header-news d-none d-xl-block">{/* <News /> */}</div>
          <div className="nk-header-tools">
            <ul className="nk-quick-nav">
              <li className="user-dropdown" onClick={() => setVisibility(false)}>
                <User />
                <ConnectButton />
                {user.get("ethAddress")}
                <a href={`${process.env.PUBLIC_URL}/auth-login`} onClick={handleSignout}>
                  <button onClick={logOut}>Logout</button>
                </a>
              </li>
              <li className="notification-dropdown mr-n1" onClick={() => setVisibility(false)}>
                {/* <Notification /> */}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
