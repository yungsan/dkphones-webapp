import MenuItem from "./MenuItem";

import { useContext } from "react";
import { SidenavContext } from "../../App";

function Sidenav() {
  const menu = useContext(SidenavContext);

  return (
    <div className="lg:w-1/5 md:w-1/2 fixed overflow-y-scroll bg-white h-screen top-0 left-0 py-8 pt-28 z-40 shadow">
      <ul>
        {menu.map((menuItem, index) => {
          return <MenuItem props={menuItem} key={index} />;
        })}
      </ul>
    </div>
  );
}

export default Sidenav;
