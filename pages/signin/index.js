import React, { useRef, useState } from "react";
import axios from "axios";
import Link from "next/link";


//Componenets
import Navbar from "../navbar/index";

//CSS
import classes from "./index.module.css";

const Signin = () => {
    const [authenticated, setAuth] = useState(false);

    const emailRef = useRef();
    const passwordRef = useRef();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        }
        axios.post('http://localhost:3001/signin', user)
        .then(res => {
            setAuth(res.data);
        })
        .catch(err => {
            console.log(err);
        })
    }

    return <div>
        <Navbar />
        <form>
            <input type="email" ref={emailRef} placeholder="Email" autoComplete="true"/>
            <input type="password" ref={passwordRef} placeholder="Password" autoComplete="true"/>
            <button className={classes.btn} type="submit" onClick={handleSubmit}>Take me In</button>
            <Link href="/signup">Create an account</Link>
        </form>
    </div>
}
export default Signin;