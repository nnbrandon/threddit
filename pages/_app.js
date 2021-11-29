import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";

import "../styles/globals.scss";

import Layout from "../components/Layout/Layout";

const ROUTES_TO_RETAIN = ["/", "/r/[subreddit]"];

function RetainedComponent(props) {
  const { Component } = props;
  if (!Component) {
    return <div></div>;
  }
  return <Component {...props} />;
}

function App({ Component, pageProps }) {
  const router = useRouter();
  const { pathname } = router; // pathname = dynamic route
  const isRetainableRoute = ROUTES_TO_RETAIN.includes(pathname);

  const [showNavbar, setShowNavBar] = useState(true);
  const [isHome, setIsHome] = useState(false);

  const ComponentRef = useRef(null);

  function releaseRetainedComponent() {
    console.log("Releasing RetainedComponent");
    ComponentRef.current = null;
  }

  function updateIsHome(home) {
    setIsHome(home);
  }

  function onClickNav() {
    setShowNavBar(!showNavbar);
  }

  // Set component for RetainedComponent
  if (isRetainableRoute) {
    console.log("Setting ComponentRef to " + Component.name);
    ComponentRef.current = Component;
  }

  return (
    <Layout
      showNavbar={showNavbar}
      releaseRetainedComponent={releaseRetainedComponent}
      isHome={isHome}
      onClickNav={onClickNav}
    >
      <RetainedComponent
        {...pageProps}
        Component={ComponentRef.current}
        isHome={isHome}
        showNavbar={showNavbar}
        updateIsHome={updateIsHome}
        onClickNav={onClickNav}
      />
      {!isRetainableRoute && (
        <Component
          {...pageProps}
          isHome={isHome}
          showNavbar={showNavbar}
          updateIsHome={updateIsHome}
          onClickNav={onClickNav}
        />
      )}
    </Layout>
  );
}

export default App;
