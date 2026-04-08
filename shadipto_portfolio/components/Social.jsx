import Link from "next/link";
import {
  FaGithub,
  FaLinkedin,
  FaYoutube,
  FaTwitter,
  FaFacebook,
} from "react-icons/fa";

const socials = [
  {
    icon: <FaGithub />,
    path: "https://github.com/Shadipto",
  },
  {
    icon: <FaLinkedin />,
    path: "https://www.linkedin.com/in/shadipto-pranto-a10427354",
  },
  {
    icon: <FaFacebook />,
    path: "https://www.facebook.com/shadipto.pranto",
  },
  {
    icon: <FaTwitter />,
    path: "https://x.com/shadipto_p?t=MoJ94PcDtV0Rh7rmyEH16Q&s=08",
  },
];

const Social = ({ containerStyles, iconsStyles }) => {
  return (
    <div className={containerStyles}>
      {socials.map((item, index) => {
        return (
          <Link
            key={index}
            href={item.path || "#"}
            target={item.path ? "_blank" : "_self"}
            rel={item.path ? "noopener noreferrer" : ""}
            className={iconsStyles}
          >
            {item.icon}
          </Link>
        );
      })}
    </div>
  );
};

export default Social;
