import { Provider } from 'react-redux';
import store from '../app/store';
import '../styles/globals.scss'
import '../styles/header.scss'

export default function App({ Component, pageProps }) {
  return <Provider store={store}><Component {...pageProps} /></Provider>;
}