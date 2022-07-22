import store from "../store";
import Header from "../components/common/header";
import Sidebar from "../components/common/sidebar";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/globals.css";

// add cookie

import App from "next/app";
import { Cookies, CookiesProvider } from "react-cookie";

function MyApp({ Component, pageProps, cookies }: any) {
  const isBrowser = typeof window !== "undefined";
  return (
    // <Provider store={store}>
    <CookiesProvider cookies={isBrowser ? undefined : new Cookies(cookies)}>
      <div className="d-flex flex-column">
        <div>
          <Header />
        </div>
        <div className="col d-flex">
          <Sidebar />
          <Component {...pageProps} />
        </div>
      </div>
    </CookiesProvider>

    // </Provider>
  );
}

MyApp.getInitialProps = async (appContext: any) => {
  const appProps = await App.getInitialProps(appContext);
  // Next.js 11 & 12
  return { ...appProps, cookies: appContext.ctx.req?.headers.cookie };
  // Next.js 12 only
  // return { ...appProps, cookies: appContext.ctx.req?.cookies }
};

export default MyApp;
