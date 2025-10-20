import React from "react";
import { useState,useContext , useEffect} from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authcontext";
import { useNavigate } from "react-router-dom";







const Signup = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState({});
  const [isloading, setisLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (error[e.target.name]) {
      setError((prev) => ({
        ...prev,
        [e.target.name]: "",
      }));
    }
  };





  const validation = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.password.trim()) newErrors.password = "Password is required";

    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validation()) {
      return;
    }

    setisLoading(true);

    try {
      const existingUserResponse = await fetch(
        `http://localhost:3001/users?email=${formData.email}`
      );
      console.log("Existing user response:", existingUserResponse);
      const existingUsers = await existingUserResponse.json();
      console.log("Existing users data:", existingUsers);
      if (existingUsers.length > 0) {
        setError({ email: "Email is already registered." });
        setisLoading(false);
        return;
      }

      const response = await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const newUser = await response.json();
      setUser(newUser);
      setSuccess(true);
      navigate("/test");
     
     
      console.log("Form submitted successfully:", formData);
      setFormData({
        name: "",
        email: "",
        password: "",
      });
      setError({});
      setisLoading(false);
    } catch (err) {
      setError({ general: "Signup failed. Please try again." });
      setisLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image */}
      <div className="w-1/2 hidden md:flex items-center justify-center bg-gray-200">
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80"
          alt="Signup"
          className="object-cover w-full h-screen"
        />
      </div>
      {/* Right Side - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white">
        <form
          className="w-full max-w-md p-10 rounded-2xl shadow-2xl bg-white flex flex-col gap-8"
          onSubmit={handleSubmit}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
            Create Account
          </h2>
          <p className="text-gray-500 text-center mb-4">
            Sign up to get started
          </p>
          <label className="flex flex-col gap-2 text-gray-700 font-medium">
            Name
            <input
              type="name"
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Enter your email"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
          <span className="text-red-500">{error.name}</span>
          <label className="flex flex-col gap-2 text-gray-700 font-medium">
            Email
            <input
              type="email"
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Enter your email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </label>
          <span className="text-red-500">{error.email}</span>
          <label className="flex flex-col gap-2 text-gray-700 font-medium">
            Password
            <input
              type="password"
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Enter your password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </label>
          <span className="text-red-500">{error.password}</span>
          <button
            type="submit"
            disabled={isloading}
            className={
              isloading
                ? "bg-blue-200 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg "
                : "bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg "
            }
          >
            {isloading ? "submiting...." : "Sign Up"}
          </button>
          {success && (
            <span className="text-green-500">Signup successful!</span>
          )}
          <span className="text-red-500">{error.general}</span>
          <p className="text-center text-gray-500 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
