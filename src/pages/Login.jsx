import { useCallback, useContext, useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../components/UserContextProvider";
import { z } from "zod";
import { User } from "../utils/Validation";

const Login = () => {
  const navigate = useNavigate();
  const userContext = useUserContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(null);
  const [loginError, setLoginError] = useState("");
  const handleSetEmail = useCallback((e) => setEmail(e.target.value), []);
  const handleSetPassword = useCallback((e) => setPassword(e.target.value), []);

  const handleLogin = useCallback(() => {
    try {
      const user = User.parse({ email, password, date: Date.now() });
      setErrors(null);
      setLoginError("");
    } catch (err) {
      if (err instanceof z.ZodError) {
        setErrors(err.format());
      }
    }

    const query = new URLSearchParams({
      email,
      password,
    }).toString();
    fetch(`http://localhost:5000/users/?${query}`)
      .then((r) => r.json())
      .then((users) => {
        if (users.length === 1) {
          userContext.setUser(users[0]);
          navigate("/");
        } else {
          setLoginError("Неправильный логин или пароль");
        }
      });
    userContext.setUser(userContext);
  }, [email, userContext, password]);

  useEffect(() => {
    if (userContext.user?.email) {
      navigate("/notes");
    }
  }, [navigate, userContext.user]);

  return (
    <div className="h-auto flex mt-20 justify-center bg-gray-10">
      <div className="w-full max-w-md bg-white rounded-lg p-8 shadow-md">
        <h1 className="text-3xl text-center mb-6">Login</h1>
        <div className="flex flex-col gap-4">
          <input
            placeholder="Email"
            value={email}
            onChange={handleSetEmail}
            type="email"
            className="border border-gray-300 p-2 rounded-md"
          />
          {errors?.email && (
            <div className="text-red-400">{errors?.email?._errors}</div>
          )}
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={handleSetPassword}
            className="border border-gray-300 p-2 rounded-md"
          />
          {errors?.password && (
            <div className="text-red-400">{errors?.password?._errors}</div>
          )}
          {loginError && <div className="text-red-400">{loginError}</div>}
        </div>
        <div className="flex flex-col items-center mt-6">
          <button
            onClick={handleLogin}
            className="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
          >
            Login
          </button>
          <Link to="/signup" className="mt-4 text-blue-500">
            Don't have an account? Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export { Login };
