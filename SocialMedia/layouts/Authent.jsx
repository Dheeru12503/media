
import { useNavigate } from "react-router-dom";


const Authent =({children})=>{
  const  navigate = useNavigate();
    const token = localStorage.getItem("token");
   return token?.split(".").length == 3 ? children : navigate("/SignIn");
}

export default Authent ;