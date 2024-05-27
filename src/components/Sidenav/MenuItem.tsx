import clsx from "clsx";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "../../utils/interfaces";
import MenuWithChild from "./MenuWithChild";

function MenuItem({ props }: { props: Menu }) {
  const location = useLocation();

  const MenuWithoutChild = () => {
    return (
      <Link
        to={props.path}
        className={clsx(
          "w-full py-4 px-8 flex flex-wrap items-center justify-between",
          {
            "bg-primary-500 text-white font-extrabold":
              props.path === location.pathname,
            "text-black opacity-80": props.path !== location.pathname,
          }
        )}
      >
        {props.label}
      </Link>
    );
  };

  return (
    <li className="border-b-gray-100 border-b">
      {!props.child ? <MenuWithoutChild /> : <MenuWithChild props={props} />}
    </li>
  );
}

export default MenuItem;
