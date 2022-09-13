import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { RedirectAs404 } from "./utils/Utils";
import PrivateRoute from "./route/PrivateRoute";

import Layout from "./layout/Index";

import Error404Classic from "./pages/error/404-classic";
import Error404Modern from "./pages/error/404-modern";
import Error504Modern from "./pages/error/504-modern";
import Error504Classic from "./pages/error/504-classic";

import Faq from "./pages/others/Faq";
import Terms from "./pages/others/Terms";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Success from "./pages/auth/Success";
import InvoicePrint from "./pages/pre-built/invoice/InvoicePrint";

import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  createAuthenticationAdapter,
  RainbowKitAuthenticationProvider,
} from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";

import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { SessionProvider } from "next-auth/react";
import { MoralisProvider } from "react-moralis";

// import { AppProps } from "next/app";

const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
  [alchemyProvider({ apiKey: process.env.ALCHEMY_ID }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const authenticationAdapter = createAuthenticationAdapter({
  getNonce: async () => {
    const response = await fetch("/api/nonce");
    return await response.text();
  },

  createMessage: ({ nonce, address, chainId }) => {
    return new SiweMessage({
      domain: window.location.host,
      address,
      statement: "Sign in with Ethereum to the app.",
      uri: window.location.origin,
      version: "1",
      chainId,
      nonce,
    });
  },

  getMessageBody: ({ message }) => {
    return message.prepareMessage();
  },

  verify: async ({ message, signature }) => {
    const verifyRes = await fetch("/api/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, signature }),
    });

    return Boolean(verifyRes.ok);
  },

  signOut: async () => {
    await fetch("/api/logout");
  },
});

const App = () => {
  return (
    <>
      <WagmiConfig client={wagmiClient}>
        <MoralisProvider
          serverUrl="https://oi374rl4scr1.usemoralis.com:2053/server"
          appId="TxA6eqcA7Kywf5RiM1oQvP2L3Njx0ZaqQSPhzKlg"
        >
          {/* <RainbowKitAuthenticationProvider adapter={authenticationAdapter} status={"loading"}> */}
          <RainbowKitProvider chains={chains}>
            <Switch>
              {/* Auth Pages */}
              <Route exact path={`${process.env.PUBLIC_URL}/auth-success`} component={Success}></Route>
              <Route exact path={`${process.env.PUBLIC_URL}/auth-reset`} component={ForgotPassword}></Route>
              <Route exact path={`${process.env.PUBLIC_URL}/auth-register`} component={Register}></Route>
              <Route exact path={`${process.env.PUBLIC_URL}/auth-login`} component={Login}></Route>

              {/* Print Pages */}
              <Route exact path={`${process.env.PUBLIC_URL}/invoice-print/:id`} component={InvoicePrint}></Route>

              {/* Helper pages */}
              <Route exact path={`${process.env.PUBLIC_URL}/auths/terms`} component={Terms}></Route>
              <Route exact path={`${process.env.PUBLIC_URL}/auths/faq`} component={Faq}></Route>

              <Route exact path={`${process.env.PUBLIC_URL}/invoice-print`} component={InvoicePrint}></Route>

              {/*Error Pages*/}
              <Route exact path={`${process.env.PUBLIC_URL}/errors/404-classic`} component={Error404Classic}></Route>
              <Route exact path={`${process.env.PUBLIC_URL}/errors/504-modern`} component={Error504Modern}></Route>
              <Route exact path={`${process.env.PUBLIC_URL}/errors/404-modern`} component={Error404Modern}></Route>
              <Route exact path={`${process.env.PUBLIC_URL}/errors/504-classic`} component={Error504Classic}></Route>

              {/*Main Routes*/}
              <PrivateRoute exact path="" component={Layout}></PrivateRoute>
              <Route component={RedirectAs404}></Route>
            </Switch>
          </RainbowKitProvider>
          {/* </RainbowKitAuthenticationProvider> */}
        </MoralisProvider>
      </WagmiConfig>
    </>
  );
};
export default withRouter(App);
