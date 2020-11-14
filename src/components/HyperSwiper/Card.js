import React from "react";
import { animated as a, interpolate } from "react-spring";

import style from "./Deck.module.css";
const trans = (r, s) => `rotateX(0deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`;

const Card = ({bind, current, active, card, gone, rot, scale, height}) => {
    return (
        <a.div
            {...bind(current)}
            className={`${style.swipeCard} ${active.has(current) && style.foregroundCard}`}
            style={{transform: interpolate([rot, scale], trans) }}>
            <div
                style={{
                    height: height,
                    backgroundImage: `url('${card.image.url}')`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center center"
                }}
                className={`${style.card}`}>
                <div style={{height: "100%", backgroundColor: "rgba(0, 0, 0, 0.25)"}}>
                    <div className={`${style.cardHeader}`}>
                        <h2>{card.name}</h2>
                        {card.biography.full_name.length > 2 ? <h3><strong>{card.biography.full_name}</strong></h3> : null}
                    </div>
                    <div className={`${style.cardBody}`}>
                        {card.biography.aliases.length > 5 ? <p><strong>Aliases</strong>: {card.biography.aliases.slice(0, 3).join(', ')}</p> : null}
                        {card.connections.group_affiliation.length > 2 ? <p><strong>Affiliations</strong>: {card.connections.group_affiliation.split(',').slice(0, 3).join(', ')}</p> : null}
                        {card.biography.first_appearance.length > 2 ? <p><strong>First appearance:</strong> {card.biography.first_appearance}</p> : null}
                    </div>
                    <div className={`${style.cardFooter}`}>
                        <small>{card.biography.publisher}</small>
                    </div>
                </div>
            </div>
        </a.div>
    )
}

export default Card;
