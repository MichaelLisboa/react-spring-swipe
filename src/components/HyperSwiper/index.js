import React, { useState, useEffect } from "react";
import Deck from "./Deck";
import { data } from "../../Data";

async function fetchCards() {
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
            fetchCards()
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

    // useEffect(
    //     () => {
    //         if (isEmpty) {
    //             console.log("IS EMPTY NO MORE CARDS, run a function")
    //         }
    //     }, [isEmpty]
    // )

    return (
        cards.length ?
        <Deck cards={cards} setIsEmpty={setIsEmpty} />
        :
        <div style={{height: "100vh", display: "flex", alignItems: "center", justifyContent: "center"}}>
            <small style={{color: "#666"}}>loading</small>
        </div>
    )
}


export default HyperSwiper;
