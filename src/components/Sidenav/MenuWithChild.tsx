import { Link } from "react-router-dom";
import { Menu } from "../../utils/interfaces";
import { IoChevronDown } from "react-icons/io5";
import clsx from "clsx";
import { useContext, useState } from "react";
import { DisplaySidenavContext } from "../../App";

function MenuWithChild({ props }: { props: Menu }) {
  const [dropdown, setDropdown] = useState(false);
  const display = useContext(DisplaySidenavContext);

  const handleDropdown = () => {
    setDropdown((prev) => !prev);
  };

  return (
    <div className="w-full">
      <div
        onClick={() => handleDropdown()}
        className={clsx(
          "py-4 px-8 flex flex-wrap items-center justify-between cursor-pointer",
          { "text-black font-bold": dropdown },
          { "text-black opacity-80": !dropdown }
        )}
      >
        {props.label}
        <IoChevronDown />
      </div>
      {dropdown &&
        props.child?.map((subItem, index) => {
          return (
            <Link
              key={index}
              to={props.path + subItem.path}
              // onClick={() => display?.setState(false)}
              className={clsx(
                "w-full py-4 pl-16 flex flex-wrap items-center justify-between",
                {
                  "bg-primary-500 text-white font-extrabold":
                    props.path + subItem.path === location.pathname,
                  "text-black opacity-80":
                    props.path + subItem.path !== location.pathname,
                }
              )}
            >
              {subItem.label}
            </Link>
          );
        })}
    </div>
  );
}

export default MenuWithChild;
