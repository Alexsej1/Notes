import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCallback } from "react";
import { z } from "zod";
import { User } from "../utils/Validation";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repPassword, setRepPassword] = useState("");
  const [errors, setErrors] = useState(null);
  const [userExistsError, setUserExistsError] = useState(false);

  const handleSetEmail = useCallback((e) => setEmail(e.target.value), []);
  const handleSetPassword = useCallback((e) => setPassword(e.target.value), []);
  const handleSetRepPassword = useCallback(
    (e) => setRepPassword(e.target.value),
    []
  );

  const userInUsers = useCallback(async (newUser) => {
    const usernames = await fetch(
      `http://localhost:5000/users?email=${newUser.email}`
    ).then((r) => r.json());
    console.log(usernames.length);
    return usernames.length === 1;
  }, []);

  const navigate = useNavigate();

  const handleSignUp = useCallback(async () => {
    try {
      const date = new Date(Date.now());

      const user = User.parse({
        email,
        password,
        repPassword,
        date: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
      });
      setErrors(null);

      if (await userInUsers(user)) {
        setUserExistsError(true);
        return;
      }

      if (password !== repPassword) {
        setErrors({ repPassword: "Пароли должны совпадать." });
        return;
      }

      fetch("http://localhost:5000/users", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      }).then(() => {
        navigate("/login");
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        setErrors(err.format());
      }
    }
  }, [email, password, repPassword, navigate, userInUsers]);
  return (
    <div className="h-auto flex mt-20 justify-center bg-gray-10">
      <div className="flex flex-col items-center gap-4 bg-white rounded-lg p-8 shadow-md">
        <h1 className="text-3xl text-center mb-6">Sign up</h1>
        <input
          placeholder="Email"
          value={email}
          onChange={handleSetEmail}
          type="email"
          className="border border-gray-300 p-2 rounded-md w-64"
        />
        {errors?.email && (
          <div className="text-red-400">{errors?.email?._errors}</div>
        )}
        <input
          placeholder="Password"
          value={password}
          onChange={handleSetPassword}
          type="password"
          className="border border-gray-300 p-2 rounded-md w-64"
        />
        {errors?.password && (
          <div className="text-red-400">{errors?.password?._errors}</div>
        )}
        <input
          placeholder="Repeat Password"
          value={repPassword}
          onChange={handleSetRepPassword}
          type="password"
          className="border border-gray-300 p-2 rounded-md w-64"
        />
        {errors?.repPassword && (
          <div className="text-red-400">{errors?.repPassword?._errors}</div>
        )}
        {password !== repPassword && (
          <div className="text-red-400">Пароли не совпадают.</div>
        )}
        {userExistsError && (
          <div className="text-red-400">
            Пользователь с такой электронной почтой уже существует
          </div>
        )}
        <button
          onClick={handleSignUp}
          className="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export { SignUp };
