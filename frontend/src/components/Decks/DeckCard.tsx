import { Deck } from "@/store/decks/types";

interface Props {
  deck: Deck;
}

const DeckCard = ({ deck }: Props) => {
  const { name, cards } = deck;
  const numCards = cards.length;
  return (
    <div className="flex bg-purple-03 px-[20px] py-[16px] rounded-[8px] flex-col leading-5">
      <div className="text-[20px] font-bold text-text-base/50">
        {numCards} cards
      </div>
      <div className="text-[24px] font-bold">{name}</div>
    </div>
  );
};

export default DeckCard;
