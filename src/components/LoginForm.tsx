import { useState } from "react";
import { COOKIES } from "../utils/definitions";
import { login } from "../utils/api";
import { CircularProgress } from "@mui/material";
import clsx from "clsx";
import { FormField, LoginResponse } from "../utils/interfaces";
import { Link } from "react-router-dom";

const LOGIN_FORM_FIELDS: FormField[] = [
  {
    label: "Email đăng nhập",
    input: {
      id: "e-email",
      type: "email",
      placeholder: "Email của bạn",
      value: "",
    },
  },
  {
    label: "Mật khẩu",
    input: {
      id: "e-password",
      type: "password",
      placeholder: "Mật khẩu đăng nhập",
      value: "",
    },
  },
];

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const stateGroup = [email, password];
  const setStateGroup = [setEmail, setPassword];
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    const data = {
      EmployeeEmail: email,
      Password: password,
    };

    const _login = async () => await login(data);
    _login()
      .then((response: LoginResponse) => {
        const accessToken = response.access_token;
        const expires = response.expires_in;
        const d = new Date();
        d.setHours(d.getHours() + expires / 3600);
        console.log(d.toLocaleString());

        COOKIES.set("access_token", accessToken, {
          expires: d,
        });

        location.reload();
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="w-full">
      <h1 className="text-center font-bold text-2xl uppercase mb-8 w-full">
        Đăng nhập
      </h1>
      {LOGIN_FORM_FIELDS.map((field, index) => {
        return (
          <div className="w-full mb-4" key={index}>
            <label className="font-bold" htmlFor={field.input.id}>
              {field.label}
            </label>
            <input
              id={field.input.id}
              value={stateGroup[index]}
              onChange={(e) => setStateGroup[index](e.target.value)}
              type={field.input.type}
              placeholder={field.input.placeholder}
              className="w-full border p-2 outline-none my-2 rounded-md focus:border-primary-500"
            />
          </div>
        );
      })}

      <div className="text-right mb-4">
        <Link
          to="/auth/reset-password"
          className="text-primary-400 hover:underline hover:text-primary-600"
        >
          Quên mật khẩu
        </Link>
      </div>

      <button
        onClick={handleClick}
        className={clsx(
          "bg-primary-500 text-white px-4 py-2 w-full rounded-md",
          { "bg-white border-primary-500 border": loading }
        )}
      >
        {loading ? <CircularProgress size={20} /> : "Đăng nhập"}
      </button>
    </div>
  );
}

export default LoginForm;
