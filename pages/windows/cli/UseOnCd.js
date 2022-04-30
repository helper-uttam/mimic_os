import React, {useState} from "react";

const UseOnCd = () => {
    const [listOfChild, setDirectories] = useState();
    const dir = {
        0:"Home",
        1:"Admin",
        2:"Public",
        3:"Docs",
        4:"Media"
    }
    const setParent = () => {
        setDirectories();
    }
    const m = 3;
    const  n = 5;
    let adjMatrix = new Array(m); 
    for (var i = 0; i < m; i++) {
      adjMatrix[i] = new Array(n); 
    }
    for (let index = 0; index < adjMatrix.length; index++) {
       for (let index2 = 0; index2 < adjMatrix[0].length; index2++) {
            if((index === 0 && (index2 === 1 || index2 === 2))
            || (index === 1 && (index2 === 3 || index2 === 4))
            || (index === 2 && (index2 === 3 || index2 === 4))
            )
            adjMatrix[index][index2] = 1;
            adjMatrix[index][index2] = 0;
       }
    }
    
    return [, setParent]
}
export default UseOnCd;