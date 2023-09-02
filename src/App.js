import './App.css';
import {
    createBrowserRouter,
    Navigate,
    RouterProvider
} from 'react-router-dom';
import Movielist from './components/Movielist/Movielist';
import Moviedetails from './components/Moviedetails/Moviedetails';
import Actordetails from './components/Actordetails/Actordetails';
import HomeLayout from "./pages/HomeLayout";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayout />,
        children: [{
            index: true,
            element: <Movielist page_title="Now playing" listMovies="now_playing"/>
        },{
            path: "/top-rated",
            element: <Movielist page_title="Top rated" listMovies="top_rated" />
        },{
            path: "/movie/:id",
            element: <Moviedetails />
        },{
            path: "/actor/:id",
            element: <Actordetails />
        },{
            path: "*",
            element: <Navigate to={"/"} replace />
        }]
    }])
function App() {
    return <RouterProvider router={router}/>;
}

export default App;
