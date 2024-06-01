import { Navigate, Outlet } from "react-router-dom";
import Sidenav from "./components/Sidenav/Sidenav";
import Topnav from "./components/Topnav";
import {
  COOKIES,
  MANAGER_MENU,
  SALES_MENU,
  SHIPPER_MENU,
  WAREHOUSE_MENU,
} from "./utils/definitions";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import { fetchCurrentUser } from "./utils/api";
import { CurrentUser, Menu, Roles } from "./utils/interfaces";

export const SidenavContext = createContext<Menu[]>([]);
export const DisplaySidenavContext = createContext<{
  state: boolean;
  setState: Dispatch<SetStateAction<boolean>>;
} | null>(null);
export const CurrentUserContext = createContext<CurrentUser | null>(null);

export default function App() {
  const auth = { token: COOKIES.get("access_token") };
  const [sidenavMenu, setSidenavMenu] = useState<Menu[]>([]);
  const [displaySidenavMenu, setDisplaySidenavMenu] = useState<boolean>(true);

  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

  useEffect(() => {
    if (auth.token) {
      const _fetchCurrentUser = async () => {
        const response: CurrentUser = await fetchCurrentUser();

        setCurrentUser(response);

        const role: number = response.DepartmentID;

        if (role === Roles.MANAGER) {
          setSidenavMenu(MANAGER_MENU);
        } else if (role === Roles.SALES) {
          setSidenavMenu(SALES_MENU);
        } else if (role === Roles.WAREHOUSE) {
          setSidenavMenu(WAREHOUSE_MENU);
        } else if (role === Roles.SHIPPER) {
          setSidenavMenu(SHIPPER_MENU);
        }
      };

      _fetchCurrentUser();
    }
  }, [auth.token]);

  return auth.token ? (
    <DisplaySidenavContext.Provider
      value={{
        state: displaySidenavMenu,
        setState: setDisplaySidenavMenu,
      }}
    >
      <SidenavContext.Provider value={sidenavMenu}>
        <CurrentUserContext.Provider value={currentUser}>
          <div className="">
            <Topnav />
            <Sidenav />
            <div className="bg-slate-200 min-h-screen w-full lg:pl-[22.5%] lg:pb-8 lg:pr-8 lg:pt-32">
              <div className="w-full min-h-screen p-8 relative">
                <Outlet />
              </div>
            </div>
          </div>
        </CurrentUserContext.Provider>
      </SidenavContext.Provider>
    </DisplaySidenavContext.Provider>
  ) : (
    <Navigate to="/auth/login" />
  );
}
