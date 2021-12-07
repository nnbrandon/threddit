import { useState } from "react";
import { useRouter } from "next/router";

import "../styles/globals.scss";

import Layout from "../components/Layout/Layout";

const SPA_ROUTES = ["/", "/r/[subreddit]"];

function App({ Component, pageProps }) {
  const router = useRouter();
  const { pathname } = router; // pathname = dynamic route
  const isSPARoute = SPA_ROUTES.includes(pathname);

  const [showNavbar, setShowNavBar] = useState(true);
  const [isHome, setIsHome] = useState(false);

  function updateIsHome(home) {
    setIsHome(home);
  }

  function onClickNav() {
    setShowNavBar(!showNavbar);
  }

  const component = isSPARoute ? (
    <div suppressHydrationWarning>
      {typeof window === "undefined" ? null : (
        <Component
          key={router.asPath}
          {...pageProps}
          isHome={isHome}
          showNavbar={showNavbar}
          updateIsHome={updateIsHome}
          onClickNav={onClickNav}
        />
      )}
    </div>
  ) : (
    <Component
      key={router.asPath}
      {...pageProps}
      isHome={isHome}
      showNavbar={showNavbar}
      updateIsHome={updateIsHome}
      onClickNav={onClickNav}
    />
  );

  return (
    <Layout showNavbar={showNavbar} isHome={isHome} onClickNav={onClickNav}>
      {component}
    </Layout>
  );
}

export default App;
