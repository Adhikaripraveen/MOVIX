import "./Header.css";
import { useState, useEffect } from "react";
import Login from "../Login/Login";
import Sign from "../Signin/Sign";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { NavLink } from "react-router-dom";
import { useWatchList } from "../../WatchListProvider";
const Header = () => {
  const [logModal, setLogModal] = useState(false);
  const [signModal, setSignModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [dropDown, setDropDown] = useState(false);
  const moveToTop = () => {
    return window.scrollTo(0, 0);
  };
  const showLog = (value) => {
    if (value === true) {
      setLogModal(true);
      setDropDown(false);
    } else setLogModal(false);
  };
  const showSign = (value) => {
    if (value === true) {
      setSignModal(true);
      setDropDown(false);
    } else setSignModal(false);
  };
  const myIcon = {
    fontSize: "3.5rem",
    color: "white",
  };
  const toggleDrop = (dropDown) => {
    setDropDown((dropDown) => !dropDown);
  };
  const { watchListItems } = useWatchList();
  let lenOfItem = Object.keys(watchListItems).length;

  useEffect(() => {
    if (watchListItems) {
      setIsLoading(false); // Set loading to false when watchListItems are available
    }
  }, [watchListItems]);
  return (
    <>
      <div className="header">
        <div className="site_title">
          <h2 onClick={moveToTop}>MOVIX </h2>
        </div>
        <div className="button_section">
          <NavLink to="/watchList">
            <button className=" watch">
              {lenOfItem > 0 ? `Watchlist (${lenOfItem})` : "Watchlist"}
            </button>
          </NavLink>

          <button className="Add_icon" onClick={() => toggleDrop(dropDown)}>
            <PersonAddAltIcon style={myIcon} />
          </button>
          {dropDown && (
            <div className="drop_down">
              <ul>
                <li>
                  <button className="drop_button" onClick={() => showLog(true)}>
                    Log in
                  </button>
                </li>
                <li>
                  <button
                    className="drop_button"
                    onClick={() => showSign(true)}
                  >
                    Sign in
                  </button>
                </li>
              </ul>
            </div>
          )}
          <button className="button" onClick={() => showLog(true)}>
            Log in
          </button>
          <button className="button" onClick={() => showSign(true)}>
            Sign in
          </button>
        </div>
      </div>
      {logModal && <Login show={showLog} />}
      {signModal && <Sign show={showSign} />}
    </>
  );
};
export default Header;
