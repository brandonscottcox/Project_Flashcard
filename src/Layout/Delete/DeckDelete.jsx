import React from "react";
import { useHistory } from "react-router-dom";
import { deleteDeck } from "../../utils/api/index";
import tryCatchError from "../../helpers/tryCatchError";

/**
 *
 * @param {Object}  ComponentProps - decks{Array}, setDecks{Function}, deckId{Number}
 * @returns {JSX} - JSX For the 'delete deck' button
 */
export default function DeckDelete({ decks, deckId, setDecks }) {
  const abortController = new AbortController();
  const history = useHistory();

  async function handleDelete() {
    const answer = window.confirm(
      "Delete the deck?\n\nYou will not be able to recover it."
    );

    if (answer) {
      await deleteDeck(deckId, abortController.signal);
      const filteredDecks = decks.filter((selected) => selected.id !== deckId);
      setDecks(() => [...filteredDecks]);
      history.push("/");
    }
  }

  return (
    <button
      type="button"
      className="btn btn-danger float-right"
      onClick={() => tryCatchError(handleDelete)}
    >
      <span className="oi oi-trash" />
    </button>
  );
}
