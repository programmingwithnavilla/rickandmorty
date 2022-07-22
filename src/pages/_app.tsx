import store from "../store";
import Header from "../components/common/header";
import Sidebar from "../components/common/sidebar";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <div className="d-flex flex-column">
        <div>
          <Header />
        </div>
        <div className="col d-flex">
          <Sidebar />
          <Component {...pageProps} />
        </div>
      </div>
    </Provider>
  );
}

export default MyApp;
