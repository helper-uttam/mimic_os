import React, {useState} from "react";
import classes from "./index.module.css";
import Link from "next/link";
import Image from 'next/image'
import Windows from "..";
import { useRouter } from 'next/router'

const Card = () => {
    var [width, setWidth] = useState();

    const router = useRouter()
    const { card } = router.query;

    return <div className={classes.card}>
        <Windows />
        <div className={classes.parent}>
            <div className={classes.title}>
            <div className={classes.title_icon}>
                {card==="bin" && <Image width={60} height={45} src={`/assets/bin.png`} />}
                {card==="chrome" &&<Image width={80} height={40} src={`/assets/chrome.png`} />}
                {card==="edge" && <Image width={60} height={40} src={`/assets/edge.png`} />}
                </div>
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
                {card==="bin" && <Image width={900} height={450} src="/assets/binBG.png" />} 
                {card==="chrome" && <Image width={900} height={450} src="/assets/chromeBG.png" />}
                {card==="edge" && <Image width={900} height={450}  src="/assets/edgeBG.png"/>}
            </div> 
        </div>
    </div>
}
export default Card;