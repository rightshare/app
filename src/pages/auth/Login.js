import React, { useState } from "react";
import Logo from "../../images/logo.png";
import LogoDark from "../../images/logo-dark.png";

import PageContainer from "../../layout/page-container/PageContainer";
import Head from "../../layout/head/Head";
import AuthFooter from "./AuthFooter";
import {
  Block,
  BlockContent,
  BlockDes,
  BlockHead,
  BlockTitle,
  Button,
  Icon,
  PreviewCard,
} from "../../components/Component";
import { Form, FormGroup, Spinner, Alert } from "reactstrap";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { ConnectButton, createAuthenticationAdapter } from "@rainbow-me/rainbowkit";
import { signIn, useSession } from "next-auth/react";
import { useAccount, useConnect, useSignMessage, useDisconnect } from "wagmi";
import { MagicConnector } from "@everipedia/wagmi-magic-connector";

import { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import { SiweMessage } from "siwe";
import { useMoralis } from "react-moralis";

// const authenticationAdapter = createAuthenticationAdapter({
//   getNonce: async () => {
//     const response = await fetch("/api/nonce");
//     return await response.text();
//   },

//   createMessage: ({ nonce, address, chainId }) => {
//     return new SiweMessage({
//       domain: window.location.host,
//       address,
//       statement: "Sign in with Ethereum to the app.",
//       uri: window.location.origin,
//       version: "1",
//       chainId,
//       nonce,
//     });
//   },

//   getMessageBody: ({ message }) => {
//     return message.prepareMessage();
//   },

//   verify: async ({ message, signature }) => {
//     const verifyRes = await fetch("/api/verify", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ message, signature }),
//     });

//     return Boolean(verifyRes.ok);
//   },

//   signOut: async () => {
//     await fetch("/api/logout");
//   },
// });

// import { SiweMessage } from "siwe";

const Login = () => {
  const { authenticate, isAuthenticated, isAuthenticating, user, account, logout } = useMoralis();

  useEffect(() => {
    if (isAuthenticated) {
      // add your logic here

      localStorage.setItem("accessToken", "token");
      setTimeout(() => {
        window.history.pushState(
          `${process.env.PUBLIC_URL ? process.env.PUBLIC_URL : "/"}`,
          "auth-login",
          `${process.env.PUBLIC_URL ? process.env.PUBLIC_URL : "/"}`
        );
        window.location.reload();
      }, 2000);
    } else {
      // setTimeout(() => {
      //   setError("Cannot login please connect your wallet first");
      //   setLoading(false);
      // }, 2000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const login = async () => {
    if (!isAuthenticated) {
      await authenticate({ signingMessage: "Login to Invoice Block" })
        .then(function (user) {
          console.log("logged in user:", user);
          console.log(user.get("ethAddress"));
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  // const logOut = async () => {
  //   await logout();
  //   console.log("logged out");
  // };

  const [loading, setLoading] = useState(false);
  const [passState, setPassState] = useState(false);
  const [errorVal, setError] = useState("");

  const onFormSubmit = (formData) => {
    setLoading(true);
    // const loginName = "info@softnio.com";
    // const pass = "123456";
    // if (isConnected === true) {
    //   localStorage.setItem("accessToken", "token");
    //   setTimeout(() => {
    //     window.history.pushState(
    //       `${process.env.PUBLIC_URL ? process.env.PUBLIC_URL : "/"}`,
    //       "auth-login",
    //       `${process.env.PUBLIC_URL ? process.env.PUBLIC_URL : "/"}`
    //     );
    //     window.location.reload();
    //   }, 2000);
    // } else {
    //   setTimeout(() => {
    //     setError("Cannot login please connect your wallet first");
    //     setLoading(false);
    //   }, 2000);
    // }
  };

  //aanand auto 9879556611

  const { errors, register, handleSubmit } = useForm();

  return (
    <React.Fragment>
      <Head title="Login" />
      <PageContainer>
        <Block className="nk-block-middle nk-auth-body  wide-xs">
          <div className="brand-logo pb-4 text-center">
            <Link to={process.env.PUBLIC_URL + "/"} className="logo-link">
              {/* <img className="logo-light logo-img logo-img-lg" src={Logo} alt="logo" />
              <img className="logo-dark logo-img logo-img-lg" src={LogoDark} alt="logo-dark" /> */}
              <h2> Invoice Block</h2>
            </Link>
          </div>

          <PreviewCard className="card-bordered" bodyClass="card-inner-lg">
            <BlockHead>
              <BlockContent>
                <BlockTitle tag="h4">Sign-In</BlockTitle>
                <BlockDes>
                  <p>Access Invoice Block using your wallet.</p>
                </BlockDes>
              </BlockContent>
            </BlockHead>
            {errorVal && (
              <div className="mb-3">
                <Alert color="danger" className="alert-icon">
                  {" "}
                  <Icon name="alert-circle" /> Please connect the wallet
                </Alert>
              </div>
            )}
            <Form className="is-alter" onSubmit={handleSubmit(onFormSubmit)}>
              {/* <FormGroup>
                <div className="form-label-group">
                  <label className="form-label" htmlFor="default-01">
                    Email or Username
                  </label>
                </div>
                <div className="form-control-wrap">
                  <input
                    type="text"
                    id="default-01"
                    name="name"
                    ref={register({ required: "This field is required" })}
                    defaultValue="info@softnio.com"
                    placeholder="Enter your email address or username"
                    className="form-control-lg form-control"
                  />
                  {errors.name && <span className="invalid">{errors.name.message}</span>}
                </div>
              </FormGroup> */}
              <FormGroup>
                {/* <div className="form-label-group">
                  <label className="form-label" htmlFor="password">
                    Passcode
                  </label>
                  <Link className="link link-primary link-sm" to={`${process.env.PUBLIC_URL}/auth-reset`}>
                    Forgot Code?
                  </Link>
                </div> */}
                <div className="form-control-wrap">
                  {/* <a
                    href="#password"
                    onClick={(ev) => {
                      ev.preventDefault();
                      setPassState(!passState);
                    }}
                    className={`form-icon lg form-icon-right passcode-switch ${passState ? "is-hidden" : "is-shown"}`}
                  >
                    <Icon name="eye" className="passcode-icon icon-show"></Icon>

                    <Icon name="eye-off" className="passcode-icon icon-hide"></Icon>
                  </a>
                  <input
                    type={passState ? "text" : "password"}
                    id="password"
                    name="passcode"
                    defaultValue="123456"
                    ref={register({ required: "This field is required" })}
                    placeholder="Enter your passcode"
                    className={`form-control-lg form-control ${passState ? "is-hidden" : "is-shown"}`}
                  /> */}
                  {errors.passcode && <span className="invalid">{errors.passcode.message}</span>}
                </div>
                <div style={{ alignItems: "center" }} className="form-note-s2 text-center pt-4">
                  <ConnectButton></ConnectButton>
                </div>
              </FormGroup>
              <FormGroup>
                {/* <Button size="lg" className="btn-block" type="submit" color="primary">
                  {loading ? <Spinner size="sm" color="light" /> : "Get Started"}
                </Button> */}

                <Button size="lg" className="btn-block" color="primary" onClick={login}>
                  Metamask Login
                </Button>
              </FormGroup>
            </Form>
            {/* <div className="form-note-s2 text-center pt-4">
              {" "}
              New on our platform? <Link to={`${process.env.PUBLIC_URL}/auth-register`}>Create an account</Link>
            </div>
            <div className="text-center pt-4 pb-3">
              <h6 className="overline-title overline-title-sap">
                <span>OR</span>
              </h6>
            </div> */}
          </PreviewCard>
        </Block>
        {/* <AuthFooter /> */}
      </PageContainer>
    </React.Fragment>
  );
};
export default Login;
