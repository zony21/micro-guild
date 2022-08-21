import { Provider } from 'react-redux';
import store from '../app/store';
import '../styles/globals.css'

store
export default function App({ Component, pageProps }) {
  return <Provider store={store}><Component {...pageProps} /></Provider>;
}