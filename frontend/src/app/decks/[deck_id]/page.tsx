"use client";

import DeckStudy from "@/components/Decks/DeckStudy";
import { isArray } from "lodash";
import { useParams } from "next/navigation";

const DeckStudyPage = () => {
  const params = useParams();
  const deckId = isArray(params.deck_id)
    ? params.deck_id.at(0)
    : params.deck_id;

  return <DeckStudy id={deckId} />;
};

export default DeckStudyPage;
