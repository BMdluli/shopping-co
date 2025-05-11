import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/auth";

const Login = () => {
  const [email, setEmail] = useState("1@2.com");
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPasswod] = useState("Password123$$");
  const emailRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = await login({ email, password });
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (emailRef.current) emailRef.current.focus();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-200">
      <Link to="/">
        <img src="/logo.svg" alt="logo" />
      </Link>
      <div className="w-[80%] mt-8 bg-white rounded-lg p-4 max-w-[500px]">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <p className="text-center">
          Don't have an account?{" "}
          <Link className="text-blue-700 font-bold underline" to="/register">
            Sign up
          </Link>
        </p>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
              ref={emailRef}
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

          <button
            className="bg-black text-white h-10 cursor-pointer disabled:bg-black/70"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
