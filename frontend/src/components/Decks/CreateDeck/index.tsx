"use client";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { createDeck } from "@/store/decks/module";
import { AppDispatch } from "@/store/store";
import { IconArrowLeft } from "@tabler/icons-react";
import { isEmpty } from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";

const CreateDeck = () => {
  const [name, setName] = useState("");
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const onCreateDeck = () => {
    dispatch(createDeck({ name, id: "" }));
  };

  return (
    <div className="flex flex-col w-full flex-1 gap-2">
      <div className="flex items-center gap-[20px]">
        <Button
          isIcon
          size="sm"
          className="h-[48px] px-[12px]"
          onClick={() => router.push("/decks")}
        >
          <IconArrowLeft stroke={3} size={24} />
        </Button>
        <h1 className="font-bold text-[40px]">New Deck</h1>
      </div>
      <Input
        size="lg"
        placeholder="New deck name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button
        isDisabled={isEmpty(name)}
        size="xl"
        variant="primary"
        onClick={onCreateDeck}
      >
        Create
      </Button>
    </div>
  );
};

export default CreateDeck;
