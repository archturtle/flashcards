"use client";

import { selectDecks } from "@/store/decks/module";
import { IconPlus, IconSparkles } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import Button from "../ui/Button";
import DeckCard from "./DeckCard";

const Decks = () => {
  const decks = useSelector(selectDecks);
  const router = useRouter();

  return (
    <div className="flex flex-col size-full gap-2">
      <div className="flex justify-between w-full">
        <h1 className="font-bold text-[40px]">My Decks</h1>
        <Button size="md">
          <IconPlus className="text-subtle-03" />
          New Deck
        </Button>
      </div>
      <Button
        variant="primary"
        size="lg"
        className="font-bold"
        onClick={() => router.push("/generate")}
      >
        <IconSparkles size={36} className="text-subtle-03" />
        Generate
      </Button>
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
