"use client";

import { IconBrain, IconPlus } from "@tabler/icons-react";
import Button from "../ui/Button";
import DeckCard from "./DeckCard";
import { useSelector } from "react-redux";
import { selectDecks } from "@/store/decks/module";

const Decks = () => {
  const decks = useSelector(selectDecks);

  return (
    <div className="flex flex-col size-full gap-2">
      <div className="flex justify-between w-full">
        <h1 className="font-bold text-[40px]">My Decks</h1>
        <Button size="md">
          <IconPlus className="text-subtle-03" />
          Create
        </Button>
      </div>
      <Button size="lg" className="font-bold">
        <IconBrain size={36} className="text-subtle-03" />
        Generate
      </Button>
      <div className="grid grid-cols-2 gap-1">
        {decks.map((deck) => (
          <DeckCard key={deck.id} deck={deck} />
        ))}
      </div>
    </div>
  );
};

export default Decks;
