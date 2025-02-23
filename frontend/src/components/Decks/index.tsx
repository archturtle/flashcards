"use client";

import { fetchDecks, selectDecks } from "@/store/decks/module";
import { IconPlus, IconSparkles } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Button from "../ui/Button";
import DeckCard from "./DeckCard";
import { AppDispatch } from "@/store/store";
import { useEffect } from "react";

const Decks = () => {
  const decks = useSelector(selectDecks);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchDecks());
  }, []);

  return (
    <div className="flex flex-col size-full gap-2">
      <div className="flex justify-between w-full">
        <h1 className="font-bold text-[40px]">My Decks</h1>
      </div>

      <div className="flex gap-2">
        <Button
          size="lg"
          className="text-[24px] flex-1 outline-purple-03 font-bold"
          onClick={() => router.push("/decks/create")}
        >
          <IconPlus size={30} stroke={3} className="text-purple-03" />
          New Deck
        </Button>

        <Button
          variant="primary"
          size="lg"
          className="font-bold flex-1 text-[24px]"
          onClick={() => router.push("/generate")}
        >
          <IconSparkles size={36} className="text-subtle-03" />
          Generate
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-1">
        {decks.map((deck) => (
          <DeckCard
            key={deck.id}
            deck={deck}
            onClick={() => router.push(`/decks/${deck.id}`)}
            onEditClick={() => router.push(`/decks/${deck.id}/edit`)}
          />
        ))}
      </div>
    </div>
  );
};

export default Decks;
