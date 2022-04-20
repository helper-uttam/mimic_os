import React from "react";
import classes from "./index.module.css";
import Link from "next/link";
import Image from 'next/image'
import Windows from "..";
import { useRouter } from 'next/router'

const Card = () => {
    const router = useRouter()
    const { card } = router.query;

    return <div className={classes.card}>
        <Windows />
        <div className={classes.parent}>
            <div className={classes.title}>
            <div><Image width={50} height={50} src={`/assets/${card}.png`} /></div>
            <div><p>{card}</p></div>
            <div>
                <button className={classes.min}>🗕</button>
                <button className={classes.max}>🗖</button>
                <Link href="/windows">
                    <button className={classes.close}>X</button>
                </Link>
            </div>
            </div>
            <div className={classes.body}>

            </div>
        </div>
    </div>
}
export default Card;