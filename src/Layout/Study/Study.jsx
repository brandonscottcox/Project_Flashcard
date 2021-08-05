import React, { useState, Fragment } from "react";
import { useRouteMatch, Link } from "react-router-dom";
import StudyCards from "./StudyCards";
import NotEnoughCards from "./NotEnoughCards";

// Nav
function StudyNav({ deck, deckId }) {
    return (
        <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
            <li className="breadcrumb-item">
            <Link to="/">
                <span className="oi oi-home" /> Home
            </Link>
            </li>
            <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
            </li>
            <li className="breadcrumb-item active">Study</li>
        </ol>
        </nav>
    );
}


export default function Study({ deckId, deck }) {
    const [viewingFront, setViewingFront] = useState(true);
    const [index, setIndex] = useState(0);
    const { url } = useRouteMatch();

    console.log(deck);
    return (
        <Fragment>
        <StudyNav deck={deck} deckId={deckId} />
        <h2>Study: {deck.name}</h2>
        {Object.keys(deck).length ? (
            deck.cards.length > 2 ? (
            <StudyCards
                deck={deck}
                viewingFront={viewingFront}
                setViewingFront={setViewingFront}
                index={index}
                setIndex={setIndex}
            />
            ) : (
            <NotEnoughCards deck={deck} url={url} />
            )
        ) : null}
        </Fragment>
    );
}