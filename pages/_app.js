import Layout from "@/components/Layout";
import "@/styles/globals.css";
import axios from "axios";
import store from "../redux/store";
import { Provider } from "react-redux";

function App({ Component, pageProps, router }) {
  const showNavbar = router.pathname !== "/admin" && router.pathname !== "/customerOrders" && router.pathname !== "/editProducts" && router.pathname !== "/allOrders"; // Update the condition based on the admin page route
  const showFooter = router.pathname !== "/admin" && router.pathname !== "/customerOrders" && router.pathname !== "/editProducts" && router.pathname !== "/allOrders" && router.pathname !== "/menu" ; // Update the condition based on the admin page route

  return (
    <Provider store={store}>
      <Layout showNavbar={showNavbar} showFooter={showFooter}>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default App;
