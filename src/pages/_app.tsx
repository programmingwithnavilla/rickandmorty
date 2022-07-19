import "../styles/globals.css";
import type { AppProps } from "next/app";
import ErrorBoundary from "../Hoc/ErrorBoundries";
import { Provider } from "react-redux";
import store from "../store";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
