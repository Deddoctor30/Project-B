import '../styles/global.scss';

import { AppProps } from "next/app";
import { wrapper } from "../store/store";
import { Provider } from "react-redux";
    
const MyApp = ({ Component, ...rest }: AppProps) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <Provider store={store}>
      <Component {...props.pageProps} />
    </Provider>
  );
};

export default MyApp;