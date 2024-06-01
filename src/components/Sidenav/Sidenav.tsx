import MenuItem from "./MenuItem";

import { useContext } from "react";
import { DisplaySidenavContext, SidenavContext } from "../../App";
import clsx from "clsx";

function Sidenav() {
  const menu = useContext(SidenavContext);
  const display = useContext(DisplaySidenavContext);

  return (
    <div
      className={clsx(
        "lg:w-1/5 md:w-1/2 fixed overflow-y-scroll bg-white h-screen top-0 py-8 pt-28 z-40 shadow",
        {
          "left-0": display?.state,
        },
        {
          "-left-full": !display?.state,
        }
      )}
    >
      <ul>
        {menu.map((menuItem, index) => {
          return <MenuItem props={menuItem} key={index} />;
        })}
      </ul>
    </div>
  );
}

export default Sidenav;
