import {
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import auth from "../../firebase.init";
import { useRef, useState } from "react";
import { Link } from "react-router";

const Login = () => {
  const [success, setSuccess] = useState(false);
  const [loginError, setLoginError] = useState("");
  const emailRef = useRef();

  const handleLogIn = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    // reset status

    setSuccess(false);
    setLoginError("");

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        // console.log(result.user);
        if (!result.user.emailVerified) {
          setLoginError("pleased verify your email");
          return;
        }
        setSuccess(!success);
      })
      .catch((error) => {
        console.log(error);
        setLoginError("Please enter correct email or password");
      });
  };

  const handleForgetPassword = () => {
    // console.log("Get me an email address", emailRef.current.value);
    const email = emailRef.current.value;
    if (!email) {
      alert("please provide a valid email");
    } else {
      sendPasswordResetEmail(auth, email).then(() => {
        alert("Password Reset email sent");
      });
    }
  };
  return (
    <div className="hero max-w-3xl mx-auto mt-12">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleLogIn} className="fieldset">
              <label className="label">Email</label>
              <input
                type="email"
                ref={emailRef}
                className="input"
                placeholder="Email"
                name="email"
              />
              <label className="label">Password</label>
              <input
                type="password"
                className="input"
                placeholder="Password"
                name="password"
              />
              <div>
                <label
                  onClick={handleForgetPassword}
                  className="link link-hover"
                >
                  Forgot password?
                </label>
              </div>
              <button className="btn btn-neutral mt-4">Login</button>
            </form>

            {success && "Login Successful"}
            {loginError && <p>{loginError}</p>}
            <p>
              New to this website please <Link to={"/signup"}>Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
