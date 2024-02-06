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

type DogsList = {  
  all: Dog[];
  favs: Dog[];
  unfavs: Dog[];
}

export interface SectionLayoutProps {
  children: ReactNode;
  favsAndUnfavsCountArr: () => number[];
  allDogs: Dog[];
  setCurrentView: (value: React.SetStateAction<Dog[]>) => void;
  activeSelector: string;
  setActiveSelector: (value: React.SetStateAction<string>) => void;
}

export interface DogsProps {
  displayDogs: Dog[];
  isLoading: boolean;
  onTrashIconClick: (dog: Dog) => void;
  handleHeartClick: (dog:  Dog, isFavorite: boolean) => void;
}

export interface CreateDogFormProps {
  createDog: (dog: Omit<Dog, 'id'>) => void;
  isLoading: boolean;
  isFavorite: boolean;
}