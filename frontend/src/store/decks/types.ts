export interface Deck {
  id: string;
  name: string;
  owner: string;
}

export interface Card {
  id: string;
  front: string;
  back: string;
}
