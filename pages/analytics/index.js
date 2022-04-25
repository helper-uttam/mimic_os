import axios from "axios";
import React, { useEffect , useState } from "react";

import classes from "./index.module.css";

const Analytics = () => {
    const [noOfUsers, setNoOfUsers] = useState(0);
    const [pageVisits, setPageVisit] = useState(0);

    useEffect(()=>{
        axios.get(`${process.env.BASE_URL}analytics`)
        .then(res => {
            // console.log(res.data);
            Object.values(res.data).map((item, index) => {
                setNoOfUsers(index+1);
                if(item.visits){
                    setPageVisit(item.visits)
                }
            })
        })
        .catch(err => console.log(err))
    },[])
  
    return <div className={classes.container}>
        <div className={classes.noOfUsers}>Our Current Users <div>{noOfUsers}</div></div>
        <div className={classes.noOfUsers}>Page Visits <div>{pageVisits}</div></div>
        <div className={classes.noOfUsers}>Thank you for these numbers <div>We appreciate it.</div></div>
    </div>
}
export default Analytics;