"use client";

import { Deck } from "@/store/decks/types";
import { IconPencil } from "@tabler/icons-react";
import Button from "../ui/Button";

interface Props {
  deck: Deck;
  onClick: () => void;
  onEditClick: () => void;
}

const DeckCard = ({ deck, onClick, onEditClick }: Props) => {
  const { name } = deck;

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEditClick();
  };

  return (
    <div
      className="flex bg-forest-07/10 px-[20px] py-[16px] rounded-[8px] flex-col leading-6 h-[120px] justify-end relative"
      onClick={onClick}
    >
      <Button
        isIcon
        size="sm"
        variant="minimal"
        className="absolute right-2 top-2"
        onClick={handleEditClick}
      >
        <IconPencil size={30} className="text-text-base/50" />
      </Button>
      <div className="text-[24px] font-bold text-text-base">{name}</div>
    </div>
  );
};

export default DeckCard;
