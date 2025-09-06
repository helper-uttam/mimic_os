import React from "react";
import Link from "next/link";
import Image from "next/image";

import classes from "./index.module.css";

const Mac = () => {
  return (
    <div className={classes.mac}>
      <div className={classes.bg}>
        <Image
          layout="fill"
          src="/assets/mac/bg.jpg"
          alt="Mac Desktop Background"
          objectFit="cover"
          priority
        />
      </div>
      <div className={classes.icons}>
        <Link href="/mac/terminal" passHref>
          <div className={classes.icon}>
            <Image
              width={120}
              height={100}
              src="/assets/mac/terminal.png"
              alt="Terminal Icon"
            />
            <p className={classes.p}>Terminal</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Mac;
