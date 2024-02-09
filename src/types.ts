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

export interface SectionLayoutProps {
  children: ReactNode;
  favsAndUnfavsCountArr: () => number[];
  handleActiveSelector: (state: string) => void;
  activeSelector: string;
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

export interface ClassAppState {
  allDogs: Dog[];
  isFavorite: boolean;
  isLoading: boolean;
  activeSelector: string;
}

export interface ClassCreateDogFormState {
  nameInput: string;
  descriptionInput: string;
  dogImage: string;
}