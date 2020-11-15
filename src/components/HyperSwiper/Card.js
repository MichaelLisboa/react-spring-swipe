import React, { useState } from "react";
import { useSpring, animated as a, interpolate } from "react-spring";
import info from "../../images/info.png";
import back from "../../images/flip-back.png";

import style from "./Deck.module.css";
const trans = (r, s) => `perspective(1500px) rotateX(5deg) rotateY(${r/10}deg) rotateZ(${r}deg) scale(${s})`;

const Card = ({bind, current, active, card, gone, rot, scale, height}) => {
    const [flipped, setFlipped] = useState(false);

    const {transform, opacity, zIndex} = useSpring({
        opacity: flipped ? 1 : 0,
        zIndex: flipped ? 1 : -1,
        transform: `perspective(600px) rotateY(${flipped ? 180 : 0}deg)`,
        config: {
            mass: 5,
            tension: 500,
            friction: 80
        }
    })

    const powerStats = data => {
        const appearance = data.appearance
        let stats = []
        stats.push(
            <>
            <tr>
                <td><span style={{textTransform: "capitalize"}}>Race:</span></td>
                <td style={{
                    textAlign: "right",
                    fontWeight: "300",
                    fontSize: "1.125rem"
                }}>{appearance.race}</td>
            </tr>
            <tr>
                <td><span style={{textTransform: "capitalize"}}>Height:</span></td>
                <td style={{
                    textAlign: "right",
                    fontWeight: "300",
                    fontSize: "1.125rem"
                }}>{appearance.height[1]}</td>
            </tr>
            <tr>
                <td><span style={{textTransform: "capitalize"}}>Weight:</span></td>
                <td style={{
                    textAlign: "right",
                    fontWeight: "300",
                    fontSize: "1.125rem"
                }}>{appearance.weight[1]}</td>
            </tr>
            <tr colspan="2"><td></td></tr>
            </>
        )
        for(const [k, v] of Object.entries(data.powerstats)) {
            stats.push(
                <tr key={k}>
                    <td><span style={{textTransform: "capitalize"}}>{k}:</span></td>
                    <td style={{
                        textAlign: "right",
                        fontWeight: "300",
                        fontSize: "1.125rem"
                    }}>{v}</td>
                </tr>
            )
        }
        return stats
    }

    return (
        <a.div
            {...bind(current)}
            className={`${style.swipeCard} ${active.has(current) && style.foregroundCard}`}
            style={{transform: interpolate([rot, scale], trans) }}>
            <a.div
                style={{
                    height: height,
                    backgroundImage: `url('${card.image.url}')`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center center",
                    opacity: opacity.interpolate(o => 1 - o),
                    transform
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
                        <img
                            src={info}
                            onClick={() => setFlipped(state => !state)}
                            alt={`Get ${card.name}'s info'`}
                            style={{
                                position: "absolute",
                                top: "-16px",
                                right: "16px",
                                zIndex: "10",
                                cursor: "pointer"
                            }}
                            width="40" />
                    </div>
                </div>
            </a.div>
            <a.div
                className={`${style.card}`}
                style={{
                    height: height,
                    backgroundImage: `url('${card.image.url}')`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center center",
                    position: "absolute",
                    top: "0px",
                    zIndex: zIndex,
                    opacity,
                    transform: transform.interpolate(t => `${t} rotateY(180deg)`)
                }}
            >
                <div className={`${style.cardBack}`}>
                    <div>
                        <h2>{card.name}</h2>
                        {card.biography.alignment.length > 2 ? <h3>{card.biography.alignment}</h3> : null}
                    </div>
                    <table style={{width: "100%"}}>
                        <caption>
                            <h3 style={{marginBottom: "8px", paddingLeft: "2px"}}>
                                Essential Stats
                            </h3>
                        </caption>
                        <tbody>
                            {powerStats(card)}
                        </tbody>
                    </table>
                    <div style={{alignSelf: "center", padding: "16px"}}>
                        <img
                            src={back}
                            onClick={() => setFlipped(state => !state)}
                            alt={`Get ${card.name}'s info'`}
                            style={{
                                cursor: "pointer"
                            }}
                            width="40" />
                    </div>
                </div>
            </a.div>
        </a.div>
    )
}

export default Card;
