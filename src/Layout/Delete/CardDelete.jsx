import React from "react";
import { deleteCard } from "../../utils/api/index";
import tryCatchError from "../../helpers/tryCatchError";

/**
 *
 * @param {Object} ComponentProps - deck{Object}, setDeck{Function}, cardId{Number}
 * @returns {JSX} - delete card button JSX
 */
export default function CardDelete({ deck, setDeck, cardId }) {
  const abortController = new AbortController();

  async function handleDelete() {
    const answer = window.confirm(
      "Delete the card?\n\nYou will not be able to recover it."
    );

    if (answer) {
      await deleteCard(cardId, abortController.signal);
      const filteredCards = deck.cards.filter((selected) => selected.id !== cardId);
      setDeck(() => ({ ...deck, cards: filteredCards }));
    }
  }

  return (
    <button
      type="button"
      className="btn btn-danger ml-1"
      onClick={() => tryCatchError(handleDelete)}
    >
      <span className="oi oi-trash" />
    </button>
  );
}
