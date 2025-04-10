import { Link } from "react-router-dom";
import { IoMenuSharp } from "react-icons/io5";
import { NavDropdown } from "react-bootstrap";
import "./SideBar.css";
import { useState } from "react";

const Sidebar = ({ selectedTab, setSelectedTab }) => {
  const sidebarList = ["Home", "Create Post","profile"];
  const [ToActive, setToActive] = useState("Home");
  const HandleonClick = (side) => {
    setToActive(side);
  };
  const handleSideChange=(side)=>{
    if(side === 'Home')return '';
    else
    if(side === 'Create Post'){
         return "createpost";
    }
  return '';
  }
  return (
    <>
      <IoMenuSharp className="sidetoggle" type="button" />

      <div className="sideBar" style={{ display: "" }}>
        <div
          className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark bg-gradient h-100"
          style={{ width: "180px", display: "block" }}
        >
          <a
            href="/"
            className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
          >
            <svg className="bi pe-none me-2" width="40" height="32">
              <use xlinkHref="#bootstrap"></use>
            </svg>
            <span className="fs-4">Spark</span>
          </a>
          <hr />
          <ul className="nav nav-pills flex-column mb-auto">
            {sidebarList.map((side) => (
              <li className="nav-item" onClick={() => HandleonClick(side)}>
                <Link
                  to={`/${handleSideChange(side)}`}
                  className={`nav-link text-white ${
                    ToActive === side && "active"
                  } `}
                  aria-current="page"
                >
                  <svg className="bi pe-none me-2" width="16" height="16">
                    <use xlinkHref="#home"></use>
                  </svg>
                  {side}
                </Link>
              </li>
            ))}
          </ul>

          <hr />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
