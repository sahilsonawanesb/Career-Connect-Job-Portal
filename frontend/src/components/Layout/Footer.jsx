import { useContext } from "react";
import { Context } from "../../main";
import { Link } from "react-router-dom";
import { FaYoutube, FaLinkedin } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

const Footer = () => {
  const { isAuthorized } = useContext(Context);
  return (
    <footer className={isAuthorized ? "footerShow" : "footerHide"}>
      <div>&copy; All Rights Reserved By Sahil.</div>
      <div>
        {/* <Link to={"https://www.facebook.com"} target="_blank">
          <FaFacebookF />
        </Link> */}
        <Link to={"https://www.youtube.com"} target="_blank">
          <FaYoutube />
        </Link>
        <Link to={"https://www.linkedin.com/in/sahil-sonawane-b83b86348/"} target="_blank">
          <FaLinkedin />
        </Link>
        <Link  target="_blank">
          <RiInstagramFill />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
