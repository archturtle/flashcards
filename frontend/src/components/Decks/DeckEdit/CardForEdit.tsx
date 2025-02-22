import Button from "@/components/ui/Button";
import { Card } from "@/store/decks/types";
import { IconTrash } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import TextArea from "./TextArea";

interface Props {
  card: Card;
  onChange: (card: Card) => void;
  onDelete: () => void;
}

const CardForEdit = ({ card: cardProp, onChange, onDelete }: Props) => {
  const [card, setCard] = useState(cardProp);

  useEffect(() => {
    setCard(cardProp);
  }, [cardProp]);

  const onFrontChange = (newFront: string) => {
    setCard((prev) => ({ ...prev, front: newFront }));
  };

  const onBackChange = (newBack: string) => {
    setCard((prev) => ({ ...prev, back: newBack }));
  };

  const save = () => onChange(card);

  const { front, back } = card;
  return (
    <div className="outline outline-blue-07/40 -outline-offset-2  flex relative  bg-blue-02 text-[24px] font-bold rounded-[12px] overflow-hidden divide-x divide-blue-07 text-blue-07">
      <TextArea
        className="rounded-l-[14px] flex-1 basis-0 p-3 bg-transparent z-10 resize-none"
        value={front}
        onChange={(e) => onFrontChange(e.target.value)}
        onBlur={save}
      />
      <TextArea
        className="rounded-r-[14px] flex-1 basis-0 bg-blue-07/10 p-3 z-10 resize-none"
        value={back}
        onChange={(e) => onBackChange(e.target.value)}
      />
      <Button
        isIcon
        size="sm"
        className="rounded-full size-[36px] p-0 right-2 top-2 bg-fire-04 absolute z-20"
        onClick={onDelete}
      >
        <IconTrash className="text-base/70" />
      </Button>
    </div>
  );
};

export default CardForEdit;
