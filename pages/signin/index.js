import React, { useRef, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";

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
            if(res.data === true){
                localStorage.setItem("session", "authenticated")
            }
        })
        .catch(err => {
            console.log(err);
        })
    }

    return <div>
        <Navbar />
        <div className={classes.container}>
            <div>
                <form className={classes.form}>
                    <input type="email" ref={emailRef} placeholder="Email" autoComplete="true"/>
                    <input type="password" ref={passwordRef} placeholder="Password" autoComplete="true"/>
                    <button className={classes.btn} type="submit" onClick={handleSubmit}>Take me In</button>
                    <Link href="/signup"><div className={classes.link}>Create an account</div></Link>
                </form>
            </div>
            <div className={classes.illustration}>
                <Image width={800} height={700} src="/assets/signin/illustration.png" />
            </div>
        </div>
    </div>
}
export default Signin;