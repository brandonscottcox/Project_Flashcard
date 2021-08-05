import React, { Fragment, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./Header";
import Home from "./Home/Home";
import NotFound from "./NotFound";
import View from "./ViewDeck/View";
import CreateDeck from "./Home/CreateDeck";

export default function Layout() {
  const [decks, setDecks] = useState([]);

  return (
    <Fragment>
      <Header />
      <main className="container">
        <Switch>
          <Route path="/decks/new">
            <CreateDeck decks={decks} setDecks={setDecks} />
          </Route>
          <Route path="/decks/:deckId">
            <View decks={decks} setDecks={setDecks} />
          </Route>
          <Route exact path="/">
            <Home decks={decks} setDecks={setDecks} />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </main>
      <footer className="mt-4"></footer>
    </Fragment>
  );
}
