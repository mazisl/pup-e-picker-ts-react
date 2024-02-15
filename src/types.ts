import { ReactNode } from "react"

export type Dog = {
  name: string;
  image: string;
  description: string;
  isFavorite: boolean;
  id: number;
}

export interface DogCardProps {
  dog: Dog;
  trashClickHandler: (dog: Dog) => void;
  handleHeartClick: (dog:  Dog, isFavorite: boolean) => void;
  isLoading: boolean;
}

export type ActiveSelector = 'all' | 'favorited' | 'unfavorited' | 'createDog'; 

export interface SectionLayoutProps {
  children: ReactNode;
  favoritesCount: number;
  unfavoritesCount: number;
  handleActiveSelector: (state: ActiveSelector) => void;
  activeSelector: string;
}

export interface DogsProps {
  displayDogs: Dog[];
  isLoading: boolean;
  onTrashIconClick: (dog: Dog) => void;
  handleHeartClick: (dog:  Dog, isFavorite: boolean) => void;
}

export interface CreateDogFormProps {
  createDog: (dog: Omit<Dog, 'id'>) => Promise<unknown>;
  isLoading: boolean;
}