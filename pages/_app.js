import Layout from '@/components/Layout'
import '@/styles/globals.css'
import axios from 'axios';
import store from "../redux/store";
import { Provider } from 'react-redux';



function App({ Component, pageProps }) {
  return (      
    <Provider store={store}>
  <Layout> 
    <Component {...pageProps} />
  </Layout>
  </Provider>
  );
}

export default App;
