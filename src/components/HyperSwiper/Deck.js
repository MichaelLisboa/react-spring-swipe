import React, { useState } from "react";
import { useSprings, animated as a, interpolate } from "react-spring";
import { useDrag } from "react-use-gesture";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import Card from "./Card";
import SwipeAlert from "./SwipeAlert";
import SwipeNav from "./SwipeNav";
import style from "./Deck.module.css";

const to = i => ({
    x: 0,
    y: i * -1.25,
    scale: 1,
    rot: -3 + Math.random() * 9,
    delay: i * 100
})

const from = i => ({
    x: 0,
    rot: 0,
    scale: 1.5,
    y: -(500 + window.innerHeight),
})

const Deck = ({cards, setIsEmpty}) => {
    const { height, width } = useWindowDimensions();
    const [isSwiped, setIsSwiped] = useState({dir: 0, value: ""});
    const [isLoading, setIsLoading] = useState();
    const [deck, setDeck] = useState(cards);
    const [card, setCard] = useState(deck.length-1);
    const [gone] = useState(() => new Set());
    const [active] = useState(() => new Set([card, card-1]));

    async function GetActiveCard(gone, dir) {
        if ((deck.length - gone.size) <= 0) {
            setTimeout(() => {
                setIsEmpty(true)
            }, 500)
            return null;
        }

        setIsSwiped({
            ...isSwiped,
            dir: dir,
            value: dir === 1 ? "like" : "pass"
        });
        setCard(card-1);
        active.delete(card+1);
        const res = await card
        return res;
    }

    const [spring, setSpring] = useSprings(deck.length, i => ({
        ...to(i),
        from: from(i)
    }));

    const bind = useDrag(({ args: [index], down, movement: [mx], distance, direction: [xDir], velocity }) => {
        const trigger = velocity > 0.2
        const dir = xDir < 0 ? -1 : 1
        if (!down && trigger) {
            gone.add(index);
            GetActiveCard(gone, dir)
        }
        setSpring(i => {
            if (index !== i) return
            const isGone = gone.has(index)
            const x = isGone ? (200 + window.innerWidth) * dir : down ? mx : 0
            const rot = mx / 100 + (isGone ? dir * 10 * velocity : 0)
            const scale = down ? 1.1 : 1
            return { x, rot, scale, delay: undefined, config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 } }
        })
        // if (!down && gone.size === cards.length) setTimeout(() => gone.clear() || setSpring(i => to(i)), 600)
    })

    const forceSwipe = dir => {
        gone.add(card);
        const down = false;
        const {xDelta, velocity} = 0;
        setSpring(i => {
            if (card !== i) return;
            const isGone = gone.has(card);
            const x = isGone ? (200 + window.innerWidth) * dir : down ? xDelta : 0 ;
            const rot = xDelta / 100 + (isGone ? dir * 10 * velocity : 0);
            const scale = down ? 1.1 : 1;
            return { x, rot, scale, delay: undefined, config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 } }
        })
        GetActiveCard(gone, dir);
    }

    active.add(card);
    active.add(card-1);

    if(deck.length === 0 || isLoading) {
        return <div />
    }

    return (
        <div
            style={{height: height}}
            className={`${style.deckContainer}`}>
            <div
                style={{height: height*0.7}}
                className={`${style.deck}`}>
                <SwipeAlert
                    isSwiped={isSwiped}
                    choice={isSwiped} />
                {spring.map(({ x, y, rot, scale }, i) =>
                    <a.div
                        className={`${style.cardContainer}`}
                        key={`card-${i}`}
                        style={{
                            height: "100%",
                            transform: interpolate([x, y], (x, y) => `translate3d(${x}px, ${y}px, 0)`)
                        }}>
                        <Card
                            card={deck[i]}
                            bind={bind}
                            active={active}
                            current={i}
                            rot={rot}
                            scale={scale}
                            height={height*0.7}
                         />
                    </a.div>
                )}
            </div>
            <SwipeNav
                deck={deck}
                cardIndex={card}
                bind={bind}
                forceSwipe={forceSwipe}
                height={height*0.4} />
        </div>
    )
}

export default Deck;
