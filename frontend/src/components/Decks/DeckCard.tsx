import { Deck } from "@/store/decks/types";

interface Props {
  deck: Deck;
}

const DeckCard = ({ deck }: Props) => {
  const { name, cards } = deck;
  const numCards = cards.length;
  return (
    <div className="flex bg-primary-03 px-[20px] py-[16px] rounded-[8px] flex-col">
      <h1 className="text-[24px] font-bold text-text/50">{numCards} cards</h1>
      <h1 className="text-[24px] font-bold">{name}</h1>
    </div>
  );
};

export default DeckCard;
