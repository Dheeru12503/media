import { useEffect } from "react";
import { useNavigate } from "react-router-dom";



const RedirectTo = ({ goto }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (goto != "") {
      console.log(goto, "sdf");

      navigate(goto);
    }
  }, []);

  return <></>;
};

export default RedirectTo;
