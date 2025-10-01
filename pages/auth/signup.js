import React, { useRef, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import Navbar from "../navbar/index";
import Footer from "../footer/index";
import Description from "../description/index";
import Dashboard from "../dashboard";
import classes from "./signup.module.css";

const Signup = () => {
  const [authenticated, setAuth] = useState(false);
  const [valid, setValid] = useState({
    email: true,
    password: true,
  });
  const [passwordMatched, setPassMatched] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmRef = useRef();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const user = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    if (!user.email || !user.password || !passwordMatched) {
      setError("Please fill all fields correctly.");
      setLoading(false);
      return;
    }
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || ""}/api/auth`;
      const res = await axios.post(apiUrl, { ...user, type: "signup" });
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        setAuth(true);
        router.push("./signin");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const validateInputEmail = () => {
    const email = emailRef.current.value;
    if (
      email.includes("@") &&
      (email.includes(".com") || email.includes(".in") || email.includes(".org"))
    ) {
      setValid((prev) => ({ ...prev, email: true }));
    } else {
      setValid((prev) => ({ ...prev, email: false }));
    }
  };

  const validateInputPass = (e) => {
    if (e.target.value.length > 5) {
      setValid((prev) => ({ ...prev, password: true }));
    } else {
      setValid((prev) => ({ ...prev, password: false }));
    }
  };

  const confirmPass = (e) => {
    if (passwordRef.current.value === e.target.value) setPassMatched(true);
    else setPassMatched(false);
  };

  return (
    <div className={classes.pageWrapper}>
      <Navbar />
      {!authenticated && (
        <div className={classes.container}>
          {/* Floating bubbles */}
          <div className={classes.bubbles}>
            {[...Array(15)].map((_, i) => (
              <span key={i} className={classes.bubble}></span>
            ))}
          </div>

          {loading ? (
            <div className={classes.overlay}>
              <div className={classes.loaderWrapper}>
                <div className={classes.loader}></div>
                <p>Creating your account...</p>
              </div>
            </div>
          ) : (
            <>
              <div>
                <form className={classes.form} onSubmit={handleSubmit}>
                  <input
                    id="email"
                    className={valid.email ? classes.valid : classes.invalid}
                    type="email"
                    ref={emailRef}
                    placeholder="Email"
                    onChange={validateInputEmail}
                    required
                    autoComplete="username"
                  />
                  {!valid.email && (
                    <p style={{ color: "red" }}>Please enter a valid address</p>
                  )}
                  <input
                    id="password1"
                    className={valid.password ? classes.valid : classes.invalid}
                    type="password"
                    ref={passwordRef}
                    placeholder="New Password"
                    onChange={validateInputPass}
                    required
                    autoComplete="new-password"
                  />
                  {!valid.password && (
                    <p style={{ color: "red" }}>
                      Please enter a password longer than 5 characters.
                    </p>
                  )}
                  <input
                    id="password2"
                    className={passwordMatched ? classes.valid : classes.invalid}
                    type="password"
                    ref={confirmRef}
                    placeholder="Confirm Password"
                    onChange={confirmPass}
                    required
                    autoComplete="new-password"
                  />
                  {!passwordMatched && (
                    <p style={{ color: "red" }}>Entered password does not match.</p>
                  )}
                  {error && <p style={{ color: "red" }}>{error}</p>}
                  <button
                    className={classes.btn}
                    type="submit"
                    disabled={!(valid.email && valid.password && passwordMatched)}
                  >
                    Create My Account
                  </button>
                  <Link href="/auth/signin">
                    <div className={classes.link}>
                      Already have an account? Sign in.
                    </div>
                  </Link>
                </form>
              </div>
              <div className={classes.illustration}>
                <Image
                  width={800}
                  height={700}
                  src="/assets/signin/illustration.png"
                  alt="Sign up illustration"
                />
              </div>
            </>
          )}
        </div>
      )}
      {authenticated && <Dashboard />}
      <Description />
      <Footer />
    </div>
  );
};

export default Signup;
