import "./Footer.css";
import { SocialIcon } from "react-social-icons";

const Footer = () => {
  return (
    <footer className="mt-5 d-flex justify-content-center">
      <SocialIcon
        bgColor="white"
        className="m-2"
        target="_blank"
        network="twitter"
        url="https://github.com/alberto-massa/PlantB"
      />
      <SocialIcon
        bgColor="white"
        className="m-2"
        target="_blank"
        network="facebook"
        url="https://github.com/alberto-massa/PlantB"
      />
      <SocialIcon
        bgColor="white"
        className="m-2"
        target="_blank"
        network="instagram"
        url="https://github.com/alberto-massa/PlantB"
      />
    </footer>
  );
};

export default Footer;
