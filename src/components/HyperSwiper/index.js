import React, { useState, useEffect } from "react";
import Deck from "./Deck";

async function fetchCards(data) {
    const cardData = data;
    const res = await cardData
    return res
}

const HyperSwiper = ({data, ...props}) => {
    const [cards, setCards] = useState({})
    const [isEmpty, setIsEmpty] = useState(true);

    useEffect(
        () => {
            setCards({})
            fetchCards(data)
            .then(result => {
                const characters = result.map((a) => [Math.random(),a]).sort((a,b) => a[0]-b[0]).map((a) => a[1]);
                setCards(characters.slice(0,10))
                setIsEmpty(false)
            })
            .catch(err => {
                console.log("FAILED", err)
            })
        }, [isEmpty]
    )

    return (
        cards.length ?
        <Deck cards={cards} setIsEmpty={setIsEmpty} />
        :
        <div style={{height: "100vh", display: "flex", alignItems: "center", justifyContent: "center"}}>
            <small style={{color: "#fff"}}>loading</small>
        </div>
    )
}


export default HyperSwiper;
