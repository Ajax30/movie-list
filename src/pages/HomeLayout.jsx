import {Outlet} from "react-router-dom";
import Topbar from "../components/Topbar/Topbar";
import Footer from "../components/Footer/Footer";

const HomeLayout = () => {
    return (
        <>
            <Topbar/>
            <div className="container">
                <Outlet/>
            </div>
            <Footer/>
        </>
    );
};

export default HomeLayout;