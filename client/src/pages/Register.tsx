import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../services/auth";

const Register = () => {
  const [email, setEmail] = useState("1@2.com");
  const [username, setUsername] = useState("sukuna");
  const [password, setPasswod] = useState("Password123$$");
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      await signup({ email, username, password });
      navigate("/login");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-200">
      <Link to="/">
        <img src="/logo.svg" alt="logo" />
      </Link>
      <div className="w-[80%] mt-8 bg-white rounded-lg p-4 max-w-[500px]">
        <h1 className="text-2xl font-bold text-center">Sign up</h1>
        <p className="text-center">
          Already have an account?{" "}
          <Link className="text-blue-700 font-bold underline" to="/login">
            Login
          </Link>
        </p>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Username</label>
            <input
              className="bg-white border-1 border-gray-300 h-10 px-2 rounded-md text-gray-800 placeholder:text-gray-700"
              type="text"
              name="username"
              placeholder="Sukuna"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              className="bg-white border-1 border-gray-300 h-10 px-2 rounded-md text-gray-800 placeholder:text-gray-700"
              type="email"
              name="email"
              placeholder="jane@doe.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email">Password</label>
            <input
              className="bg-white border-1 border-gray-300 h-10 px-2 rounded-md text-gray-800 placeholder:text-gray-700"
              type="password"
              name="password"
              placeholder="********"
              required
              value={password}
              onChange={(e) => setPasswod(e.target.value)}
            />
          </div>

          <button className="bg-black text-white h-10">Sign up</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
