import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendSignInLinkToEmail,
} from "firebase/auth";
import auth from "../../firebase.init";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router";

const SignUp = () => {
  const [success, setSuccess] = useState(false);
  const [showError, setShowError] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSignUp = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    const terms = form.terms.checked;

    if (!passwordRegex.test(password)) {
      setShowError(
        "❌ Password must be at least 8 characters long and include:\n- one uppercase letter\n- one lowercase letter\n- one number\n- one special character."
      );
      return;
    }
    if (!emailRegex.test(email)) {
      setShowError("❌ Please enter a valid email address.");
    }

    if (!terms) {
      setShowError("please accept our terms and conditions");
      return;
    }
    setSuccess(false);
    setShowError("");
    // create new user
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        // console.log(user);
        setSuccess(!success);

        // Email verification
        sendEmailVerification(auth.currentUser).then((result) => {
          console.log(result.user);
        });
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
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute -top-9 right-8"
              >
                {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
              </button>
            </div>
            <label className="label">
              <input type="checkbox" className="checkbox" name="terms" />
              <span className="label-text">Accept our terms & conditions</span>
            </label>

            <div>
              <p>
                Already have an Account? <Link to={"/login"}>Log In</Link>
              </p>
            </div>
            <button className="btn btn-neutral mt-4">Sign Up</button>
          </form>

          {showError && <p className="text-red-400">{showError}</p>}
          {success && (
            <p className="text-green-500">Successfully created your account</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
