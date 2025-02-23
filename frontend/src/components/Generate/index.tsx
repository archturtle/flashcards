"use client";

import { Card } from "@/store/decks/types";
import { IconArrowLeft } from "@tabler/icons-react";
import { isEmpty } from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "../ui/Button";
import EditGeneratedCards from "./EditGeneratedCards";
import GenerateCardForm from "./GenerateCardForm";

const Generate = () => {
  const router = useRouter();
  const [generatedCards, setGeneratedCards] = useState<Card[]>([]);

  const isGeneratingCards = isEmpty(generatedCards);

  return (
    <div className="flex flex-col gap-2 flex-1 pb-[16px] w-full overflow-hidden">
      <div className="flex items-center gap-[20px] w-full">
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
      {isGeneratingCards ? (
        <GenerateCardForm />
      ) : (
        <>
          <EditGeneratedCards
            cards={generatedCards}
            onCardsChange={setGeneratedCards}
          />
        </>
      )}
    </div>
  );
};

export default Generate;
