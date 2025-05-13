import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../services/auth";
import toast from "react-hot-toast";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPasswod] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const usernameRef = useRef<any>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signup({ email, username, password, name, surname, dob, phone });
      navigate("/login");
      toast.success("Registration successfull");
    } catch (e: any) {
      toast.error(e.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (usernameRef.current) usernameRef.current.focus();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-200">
      <Link to="/">
        <img src="/logo.svg" alt="logo" />
      </Link>
      <div className="w-[80%] mt-8 bg-white rounded-lg p-4 max-w-[500px] overflow-y-scroll">
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
              onChange={(e: any) => setUsername(e.target.value)}
              ref={usernameRef}
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
            <label htmlFor="name">First Name</label>
            <input
              className="bg-white border-1 border-gray-300 h-10 px-2 rounded-md text-gray-800 placeholder:text-gray-700"
              type="text"
              name="name"
              placeholder="John"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="surname">Last Name</label>
            <input
              className="bg-white border-1 border-gray-300 h-10 px-2 rounded-md text-gray-800 placeholder:text-gray-700"
              type="text"
              name="surname"
              placeholder="John"
              required
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="dob">Date of Birth</label>
            <input
              className="bg-white border-1 border-gray-300 h-10 px-2 rounded-md text-gray-800 placeholder:text-gray-700"
              type="date"
              name="dob"
              required
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="phone">Phone Number</label>
            <input
              className="bg-white border-1 border-gray-300 h-10 px-2 rounded-md text-gray-800 placeholder:text-gray-700"
              type="text"
              name="phone"
              placeholder="0123456789"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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
            {isLoading ? "Loading..." : "Sign up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
