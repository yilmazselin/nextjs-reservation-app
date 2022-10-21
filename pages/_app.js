import { SessionProvider } from "next-auth/react";
import { appWithTranslation } from "next-i18next";
import { Provider } from "react-redux";
import { wrapper } from "../src/redux/store";
import "../styles/fonts.css";
import "../styles/globals.css";

function App({ Component, pageProps: { session, ...pageProps } }) {
  const { store, props } = wrapper.useWrappedStore(pageProps);
  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </Provider>
  );
}

export default appWithTranslation(App);
