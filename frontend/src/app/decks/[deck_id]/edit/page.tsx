"use client";

import DeckEdit from "@/components/Decks/DeckEdit";
import { useParams } from "next/navigation";
import { isArray } from "util";

const DeckEditPage = () => {
  const params = useParams();
  const deckId = isArray(params.deck_id)
    ? params.deck_id.at(0)
    : params.deck_id;

  return <DeckEdit id={deckId} />;
};

export default DeckEditPage;
