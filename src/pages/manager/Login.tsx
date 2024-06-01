import { Navigate } from "react-router-dom";
import LoginForm from "../../components/LoginForm";
import { COOKIES } from "../../utils/definitions";

function Login() {
  const auth = { token: COOKIES.get("access_token") };
  return !auth.token ? (
    <div className="w-full bg-primary-400 flex items-center justify-center min-h-screen shadow">
      <div className="bg-white py-8 px-8 h-screen rounded-lg lg:w-1/3 w-full flex flex-wrap items-center">
        <LoginForm />
      </div>
      <div className="h-screen w-2/3 relative hidden lg:block">
        <img
          src="https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2FsZXN8ZW58MHx8MHx8fDA%3D"
          alt="sada"
          className="h-full w-full object-cover"
        />
        <div className="bg-black absolute top-0 left-0 w-full h-full opacity-45"></div>
        {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <h1 className="text-8xl text-white  text-center">Hi!</h1>
          <h1 className="text-8xl text-white flex items-center">
            Welcome back.
          </h1>
        </div> */}
      </div>
    </div>
  ) : (
    <Navigate to="/" />
  );
}

export default Login;
