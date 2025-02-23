"use client";

import { Deck } from "@/store/decks/types";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import Button from "../ui/Button";

interface Props {
  deck: Deck;
  onClick: () => void;
  onEditClick: () => void;
  onDeleteClick: () => void;
}

const DeckCard = ({ deck, onClick, onEditClick, onDeleteClick }: Props) => {
  const { name } = deck;

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEditClick();
  };

  const handleDeleteButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDeleteClick();
  };

  return (
    <div
      className="flex bg-forest-07/10 px-[20px] py-[16px] rounded-[8px] flex-col leading-6 h-[120px] justify-end relative"
      onClick={onClick}
    >
      <div className="absolute flex top-2 right-2">
        <Button
          isIcon
          size="sm"
          className="p-0"
          variant="minimal"
          onClick={handleDeleteButtonClick}
        >
          <IconTrash size={30} className="text-base-06" />
        </Button>
        <Button isIcon size="sm" variant="minimal" onClick={handleEditClick}>
          <IconPencil size={30} className="text-base-06" />
        </Button>
      </div>
      <div className="text-[24px] font-bold text-text-base">{name}</div>
    </div>
  );
};

export default DeckCard;
