"use client";

import { Card } from "@/store/decks/types";
import { IconArrowLeft } from "@tabler/icons-react";
import { isEmpty } from "lodash";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "../ui/Button";
import EditGeneratedCards from "./EditGeneratedCards";
import GenerateCardForm from "./GenerateCardForm";
import { useGenerateCards } from "@/store/react-query/generateCards/module";
import { GenerateCardPayload } from "@/store/react-query/generateCards/types";

const Generate = () => {
  const router = useRouter();
  const [generatedCards, setGeneratedCards] = useState<Card[]>([]);
  const [generatePayload, setGeneratePayload] = useState<GenerateCardPayload>({
    prompt: "",
    file: null,
  });
  const { mutateAsync, data } = useGenerateCards(generatePayload);

  useEffect(() => {
    setGeneratedCards(
      data?.map((data: Partial<Card>) => ({ ...data, deckId: "" })) ?? [],
    );
  }, [data]);

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
        <GenerateCardForm
          onGenerate={mutateAsync}
          generatePayload={generatePayload}
          onGeneratePayloadChange={setGeneratePayload}
        />
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
