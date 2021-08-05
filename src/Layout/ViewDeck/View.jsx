import React, { Fragment, useState, useEffect } from "react";
import { Switch, Route, useRouteMatch, Link } from "react-router-dom";
import Study from "../Study/Study";
import { readDeck } from "../../utils/api/index";
import ManageDeck from "./ManageDeck";
import AddEditCard from "./AddEditCard";
import EditDeck from "./EditDeck";
import CardDelete from "../Delete/CardDelete";



// Nav
function ViewNav({ deck }) {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">
            <span className="oi oi-home" /> Home
          </Link>
        </li>
        <li className="breadcrumb-item active">{deck.name}</li>
      </ol>
    </nav>
  );
}

//Cards List
function CardsList({ setDeck, deck, url }) {
  if (Object.keys(deck).length > 0) {
    return deck.cards.map((card) => (
      <div className="card mb-1" key={card.id}>
        <div className="card-body">
          <span className="card-text d-flex row">
            <p className="col-5">{card.front}</p>
            <p className="col-2"></p>
            <p className="col-5">{card.back}</p>
          </span>
          <div className="float-right row">
            <Link className="btn btn-secondary" to={`${url}/cards/${card.id}/edit`}>
              <span className="oi oi-pencil" /> Edit
            </Link>
            <CardDelete deck={deck} cardId={card.id} setDeck={setDeck} />
          </div>
        </div>
      </div>
    ));
  } else {
    return null;
  }
}



// View Export
export default function View({ decks, setDecks }) {
  const [deck, setDeck] = useState({});
  const abortController = new AbortController();
  const {
    params: { deckId },
    url,
  } = useRouteMatch();

  useEffect(() => {
    readDeck(deckId, abortController.signal).then(setDeck).catch(console.log);
    return () => abortController.abort();
  }, []);

  return (
    <Fragment>
      <Switch>
        <Route path={`${url}/cards/:cardId/edit`}>
          <AddEditCard
            edit={true}
            deck={deck}
            setDeck={setDeck}
            deckUrl={url}
            deckId={deckId}
          />
        </Route>
        <Route path={`${url}/cards/new`}>
          <AddEditCard
            edit={false}
            deck={deck}
            setDeck={setDeck}
            deckUrl={url}
            deckId={deckId}
          />
        </Route>
        <Route path={`${url}/edit`}>
          <EditDeck deck={deck} setDeck={setDeck} deckUrl={url} />
        </Route>
        <Route path={`${url}/study`}>
          <Study deckId={deckId} deck={deck} setDeck={setDeck} />
        </Route>

        <Route exact path={url}>
          <ViewNav deck={deck} />
          <ManageDeck
            deck={deck}
            decks={decks}
            setDecks={setDecks}
            deckId={deckId}
          />

          {Object.keys(deck).length > 0 ? (
            deck.cards.length > 0 ? (
              <h2 className="mb-3">Cards</h2>
            ) : (
              <h2>There are no cards in this deck yet.</h2>
            )
          ) : null}
          <CardsList setDeck={setDeck} deck={deck} url={url} />
        </Route>
      </Switch>
    </Fragment>
  );
}




