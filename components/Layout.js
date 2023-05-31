import Footer from "./Footer"
import Navbar from "./Navbar"
import Address from "./address"
// import { useRouter } from "next/router";


const Layout = ({children}) => {
// const router = useRouter();

    return (
        <>
            <Navbar />
            {/* {router.pathname === "/menu" && <Address />} */}
            {children}
        </>
    )
}

export default Layout