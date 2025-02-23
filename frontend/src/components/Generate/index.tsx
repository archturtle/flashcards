"use client";

import Button from "@/components/ui/Button";
import { dummyCards } from "@/store/decks/dummy";
import { IconArrowLeft, IconPlus } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CardForEdit from "../ui/CardForEdit";

const Generate = () => {
  const router = useRouter();
  const [generatedCards, setGeneratedCards] = useState(dummyCards);

  return (
    <div className="flex flex-col gap-2 flex-1 pb-[16px]">
      <div className="flex items-center gap-[20px]">
        <Button
          isIcon
          size="sm"
          className="h-[48px] px-[12px]"
          onClick={() => router.push("/decks")}
        >
          <IconArrowLeft stroke={3} size={24} />
        </Button>
        <h1 className="font-bold text-[40px]">Generate Cards</h1>
      </div>

      <div className="flex flex-col flex-1 overflow-y-scroll scrollbar-hide gap-1">
        {generatedCards.map((card) => (
          <CardForEdit
            onDelete={() => {}}
            key={card.id}
            card={card}
            onChange={() => {}}
          />
        ))}
        <Button className="text-text-base/50 rounded-[12px]">
          <IconPlus />
          New card
        </Button>
      </div>
    </div>
  );
};

export default Generate;
