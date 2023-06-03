import Footer from "./Footer";
import Navbar from "./Navbar";
import Address from "./address";

const Layout = ({ children, showNavbar, showFooter }) => {
  return (
    <>
      {showNavbar && <Navbar />}
      {children}
      {showFooter && <Footer />}
    </>
  );
};

export default Layout;

