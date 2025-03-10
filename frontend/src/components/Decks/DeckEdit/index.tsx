"use client";

import Button from "@/components/ui/Button";
import {
  createCard,
  deleteCard,
  fetchCards,
  fetchDeck,
  selectCardsByDeckId,
  selectDeckById,
  updateCard,
} from "@/store/decks/module";
import { AppDispatch } from "@/store/store";
import { IconArrowLeft, IconPlus } from "@tabler/icons-react";
import { isNil } from "lodash";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import CardForEdit from "../../ui/CardForEdit";
import { Card } from "@/store/decks/types";
import { useEffect } from "react";

interface Props {
  id?: string;
}

const DeckEdit = ({ id }: Props) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const deck = useSelector(!isNil(id) ? selectDeckById(id) : () => undefined);

  const cards = useSelector(
    !isNil(deck?.id) ? selectCardsByDeckId(deck?.id) : () => [],
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchDeck(id));
      dispatch(fetchCards(id));
    }
  }, []);

  const onCreateCard = () => {
    if (deck)
      dispatch(
        createCard({
          front: "Front",
          back: "Back",
          id: "",
          deckId: deck.id,
        }),
      );
  };

  const onDeleteCard = (id: string) => {
    dispatch(deleteCard(id));
  };

  const onUpdateCard = (card: Card) => {
    dispatch(updateCard(card));
  };

  if (isNil(deck)) return "Deck is not defined";

  return (
    <div className="flex flex-col gap-2 flex-1 pb-[16px] w-full">
      <div className="flex items-center gap-[20px]">
        <Button
          isIcon
          size="sm"
          className="h-[48px] px-[12px]"
          onClick={() => router.push("/decks")}
        >
          <IconArrowLeft stroke={3} size={24} />
        </Button>
        <h1 className="font-bold text-[40px]">{deck.name}</h1>
      </div>

      <div className="flex flex-col flex-1 overflow-y-scroll scrollbar-hide gap-1">
        {cards.map((card) => (
          <CardForEdit
            onDelete={() => onDeleteCard(card.id)}
            key={card.id}
            card={card}
            onChange={onUpdateCard}
          />
        ))}
        <Button
          className="text-text-base/50 rounded-[12px]"
          onClick={() => onCreateCard()}
        >
          <IconPlus />
          New card
        </Button>
      </div>
    </div>
  );
};

export default DeckEdit;
