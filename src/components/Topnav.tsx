import { useContext, useState } from "react";
import SampleAvatar from "../assets/react.svg";
import { logout } from "../utils/api";
import { CiLogout } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { CurrentUserContext } from "../App";

function Topnav() {
  const userContext = useContext(CurrentUserContext);
  const [showMenuItem, setShowMenuItem] = useState(false);

  const handleShowMenuItem = () => setShowMenuItem(!showMenuItem);

  const userMenuItem: {
    label: string;
    icon: any;
    onClick?: () => void;
  }[] = [
    { label: "Hồ sơ", icon: CiUser },
    {
      label: "Đăng xuất",
      icon: CiLogout,
      onClick: () => {
        const _logout = async () => await logout();
        _logout();
      },
    },
  ];

  return (
    <div className="w-full fixed top-0 left-0 bg-white h-24 flex items-center px-8 z-50 shadow">
      <div className="">
        <h1 className="font-extrabold text-2xl">
          <span className="text-primary-500">DK</span>
          <span className="font-light">Phones</span>
        </h1>
      </div>
      <div className="flex-1 flex items-center justify-end min-h-24">
        <div className="w-12 h-12 rounded-full bg-white border cursor-pointer relative">
          <img
            src={SampleAvatar}
            alt="user avatar"
            className="w-full h-full"
            onClick={handleShowMenuItem}
          />
          {showMenuItem && (
            <div className="min-w-48 min-h-20 py-2 rounded-b-md bg-white border shadow absolute top-[4.5rem] left-0">
              {userMenuItem.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="w-full px-4 py-2 flex items-center"
                    onClick={item.onClick}
                  >
                    <span className="mr-4 text-gray-400">
                      {<item.icon size={24} />}
                    </span>
                    <p className="font-semibold">{item.label}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div className="px-2">
          <h3 className="font-semibold">{userContext?.EmployeeName}</h3>
          <p className="text-primary-400">{userContext?.EmployeeEmail}</p>
        </div>
      </div>
    </div>
  );
}

export default Topnav;
