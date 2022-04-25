import axios from "axios";
import React, { useEffect , useState } from "react";

import classes from "./index.module.css";

const Analytics = () => {
    const [noOfUsers, setNoOfUsers] = useState(0);
    useEffect(()=>{
        axios.get(`${process.env.BASE_URL}analytics`)
        .then(res => {
            Object.keys(res.data).map((item, index) => {
                setNoOfUsers(index+1);
            })
        })
    },[])
  
    return <div className={classes.container}>
        <div className={classes.noOfUsers}>Our Current Users <div>{noOfUsers}</div></div>
        <div></div>
        <div></div>
    </div>
}
export default Analytics;