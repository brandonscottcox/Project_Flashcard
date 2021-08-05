import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import DeckDelete from "../Delete/DeckDelete";

export default function DecksMap({ decks, setDecks }) {
  return (
    <Fragment>
      {decks.map((deck) => (
        <div className="card mb-1" key={deck.id}>
          <div className="card-body">
            <div className="d-flex w-100 justify-content-between">
              <h5 className="card-title">{deck.name}</h5>
              {deck.cards ? <small>{deck.cards.length} cards</small> : null}
            </div>
            <p className="card-text">{deck.description}</p>
            <Link className="btn btn-secondary mr-1" to={`/decks/${deck.id}`}>
              <span className="oi oi-eye" /> View
            </Link>
            <Link className="btn btn-primary" to={`/decks/${deck.id}/study`}>
              <span className="oi oi-book" /> Study
            </Link>
            <DeckDelete decks={decks} deckId={deck.id} setDecks={setDecks} />
          </div>
        </div>
      ))}
    </Fragment>
  );
}
