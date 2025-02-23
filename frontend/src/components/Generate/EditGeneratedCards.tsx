import { selectDecks } from "@/store/decks/module";
import { Card, Deck } from "@/store/decks/types";
import { nanoid } from "@reduxjs/toolkit";
import { IconChevronDown, IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../ui/Button";
import CardForEdit from "../ui/CardForEdit";
import { AppDispatch } from "@/store/store";

interface Props {
  cards: Card[];
  onCardsChange: (cards: Card[]) => void;
}

const EditGeneratedCards = ({ cards, onCardsChange }: Props) => {
  const decks = useSelector(selectDecks);
  const dispatch = useDispatch<AppDispatch>();
  const [targetDeck, setTargetDeck] = useState<Deck | null>(
    decks.at(0) ?? null,
  );

  const onCardChange = (newCard: Card) => {
    const newGeneratedCards = cards.map((card) =>
      card.id === newCard.id ? newCard : card,
    );
    onCardsChange(newGeneratedCards);
  };

  const onCardDelete = (id: string) => {
    const newGeneratedCards = cards.filter((card) => card.id !== id);
    onCardsChange(newGeneratedCards);
  };

  const createNewCard = () => {
    const newCard: Card = {
      front: "",
      back: "",
      id: nanoid(),
      deckId: nanoid(),
    };
    const newCards = [...cards, newCard];
    onCardsChange(newCards);
  };

  const selectDeckById = (id: string) => {
    const newTargetDeck = decks.find((deck) => deck.id === id);
    if (newTargetDeck) setTargetDeck(newTargetDeck);
  };

  const save = () => {};

  return (
    <div className="w-full flex-1 flex flex-col justify-between gap-2">
      <div className="flex flex-col flex-1 overflow-y-scroll scrollbar-hide gap-1 flex-1">
        {cards.map((card) => (
          <CardForEdit
            onDelete={() => onCardDelete(card.id)}
            key={card.id}
            card={card}
            onChange={onCardChange}
          />
        ))}
        <Button
          className="text-text-base/50 rounded-[12px]"
          onClick={createNewCard}
        >
          <IconPlus />
          New card
        </Button>
      </div>
      <div className="flex flex-col gap-1">
        <div className="w-full relative">
          <select
            className="px-[24px] text-text-base py-[18px] text-[32px] font-bold justify-between appearance-none rounded-[12px] bg-base-01 outline outline-base-06/50 -outline-offset-2 flex w-full"
            value={targetDeck?.id}
            onChange={(e) => selectDeckById(e.target.value)}
          >
            <option value="" disabled hidden>
              Select an option
            </option>
            {decks.map((deck) => (
              <option key={deck.id} value={deck.id}>
                {deck.name}
              </option>
            ))}
          </select>
          <IconChevronDown
            size={36}
            stroke={3}
            className="absolute right-[20px] top-1/2 -translate-y-1/2"
          />
        </div>
        <Button
          variant="primary"
          className="text-[32px] font-bold"
          onClick={save}
        >
          Save Cards
        </Button>
      </div>
    </div>
  );
};

export default EditGeneratedCards;
