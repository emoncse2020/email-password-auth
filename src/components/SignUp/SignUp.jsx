import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase.init";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const SignUp = () => {
  const [success, setSuccess] = useState(false);
  const [showError, setShowError] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleSignUp = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    setSuccess(false);

    if (!passwordRegex.test(password)) {
      setShowError(
        "❌ Password must be at least 8 characters long and include:\n- one uppercase letter\n- one lowercase letter\n- one number\n- one special character."
      );
      return;
    }

    // create new user
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setSuccess(!success);
      })
      .catch((error) => {
        console.log(error);
        const errorMessage = error.message;
        setShowError(errorMessage);
      });
  };
  return (
    <div className="hero mt-12 flex justify-center items-center">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <form onSubmit={handleSignUp} className="fieldset">
            <label className="label">Email</label>
            <input
              type="email"
              className="input"
              placeholder="Email"
              name="email"
            />
            <label className="label">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="input"
              placeholder="Password"
              name="password"
            />

            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <button className="btn btn-neutral mt-4">Sign Up</button>
          </form>

          {showError && <p className="text-red-400">{showError}</p>}
          {success && (
            <p className="text-green-500">Successfully created your account</p>
          )}
          <div className="relative">
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute -top-30 right-8"
            >
              {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
