
import { useState } from "react";
import { Link } from "react-router-dom";
const Login = () => {
 
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        });

    const [error, setError] = useState({});
    const [isloading, setisLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const validation = () => {
        let newErrors = {};
        if (!formData.email.trim()) newErrors.email = "Email is required";
        if (!formData.password.trim()) newErrors.password = "Password is required";
        setError(newErrors);
        return Object.keys(newErrors).length === 0;
    }

        const handleSubmit = async (e) => {   
            e.preventDefault();
            console.log(" i am formDara", formData);

            try{

            if(!validation()){
                return ;
            }
                setisLoading(true);
                const response =await fetch(`http://localhost:3001/users?email=${formData.email}&password=${formData.password}`);
                const data = await response.json();
                console.log("i am data", data);
                if(data.length === 0){
                    setError({general: "Invalid email or password"});
                    setisLoading(false);
                    return;
                }
                setError({});
                setisLoading(false);
                setSuccess(true);
            }catch(err){
                console.log(err);
            }
        }
        const handleChange = (e) => {
            setFormData({
              ...formData,
              [e.target.name]: e.target.value,
            });
        }

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
            Log In
          </h2>
          <p className="text-gray-500 text-center mb-4">
            Log in to your account
          </p>
          
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
            {isloading ? "please wait...." : "Log In"}
          </button>
          {success && <span className="text-green-500">Login successful!</span>}
         <span className="text-red-500">{error.general}</span>
          <p className="text-center text-gray-500 text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
                Sign up
            </Link>
           
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login