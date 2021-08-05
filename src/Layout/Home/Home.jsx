import React, { useEffect, Fragment } from "react";
import { listDecks } from "../../utils/api/index";
import DecksMap from "./DecksMap";
import { Link } from "react-router-dom";


function CreateDeckButton() {
  return (
    <Link className="btn btn-secondary mb-2" to="/decks/new">
      <span className="oi oi-plus" /> Create a deck
    </Link>
  );
}


export default function Home({ decks, setDecks }) {
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    listDecks(signal).then(setDecks).catch(console.log);
    return () => abortController.abort();
  }, []);

  return (
    <Fragment>
      <CreateDeckButton />
      <DecksMap decks={decks} setDecks={setDecks} />
    </Fragment>
  );
}
