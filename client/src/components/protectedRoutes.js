import {Navigate,useLocation} from 'react-router-dom';
import Cookies from 'universal-cookie';
const cookies = new Cookies();


const ProtectedRoutes = ({children})=>{
    const token = cookies.get("Token");
    let location = useLocation();
    if(!token){
        return <Navigate to="/login" state={{from:location}} replace/>
    }
    return children;
}

export default ProtectedRoutes;