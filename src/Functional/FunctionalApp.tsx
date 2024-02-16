import { useEffect, useState } from "react";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalSection } from "./FunctionalSection";

import toast from "react-hot-toast";

import type { Dog } from "../types";
import type { ActiveSelector } from "../types";
import { Requests } from "../api";

export function FunctionalApp() {
  const [allDogs, setAllDogs] = useState<Dog[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeSelector, setActiveSelector] = useState<ActiveSelector>("all");

  //this func fetches dogs from db and updates state of allDogs with the fetched dogs array
  const refetchDogs = () => {
    setIsLoading(true);
    return Requests.getAllDogs()
      .then((dogs) => setAllDogs(dogs))
      .catch(() => toast.error('Failed to refetch dogs!'))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    refetchDogs();
  }, []);

  const favoriteDogList = allDogs.filter((dog) => dog.isFavorite);
  const notFavoriteDogList = allDogs.filter((dog) => !dog.isFavorite);

  const dogList = {
    all: allDogs,
    favorited: favoriteDogList,
    unfavorited: notFavoriteDogList,
  };

  //this func changes activeSelector state and displays the list of dogs as per active selector
  //if a tab is already active and displaying it's list, clicking that tab again will remove it's active status and the full list of dogs will be displayed
  const handleActiveSelector = (state: ActiveSelector) => {
    const newSelector = activeSelector === state ? "all" : state;
    setActiveSelector(newSelector);
  };

  //this func creates new dog in db, fetches all the dogs from db and updates state of allDogs
  const createDog = (dog: Omit<Dog, "id">) => {
    setIsLoading(true);
    return Requests.postDog(dog)
      .then(() => refetchDogs())
      .then(() => {
        toast.success("Thanks for creating a new dog! 😃");
      })
      .finally(() => setIsLoading(false))
  };

  const onTrashIconClick = (dog: Dog) => {
    setIsLoading(true);
    Requests.deleteDog(dog)
      .then(() => refetchDogs())
      .catch(() => toast.error('Could not delete dog!'))
      .finally(() => setIsLoading(false));
  };

  const handleHeartClick = (dog: Dog, isFavorite: boolean) => {
    setIsLoading(true);
    const dogCopy = { ...dog, isFavorite };

    Requests.updateDog(dogCopy)
      .then(() => {
        return dog.isFavorite;
      })
      .then(() => refetchDogs())
      .catch(() => toast.error('Could not change favorite status!'))
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>

      <FunctionalSection
        favoritesCount={favoriteDogList.length}
        unfavoritesCount={notFavoriteDogList.length}
        handleActiveSelector={handleActiveSelector}
        activeSelector={activeSelector}
      >
        {activeSelector === "createDog" ? (
          <FunctionalCreateDogForm
            createDog={createDog}
            isLoading={isLoading}
          />
        ) : (
          <FunctionalDogs
            displayDogs={dogList[activeSelector]}
            isLoading={isLoading}
            onTrashIconClick={onTrashIconClick}
            handleHeartClick={handleHeartClick}
          />
        )}
      </FunctionalSection>
    </div>
  );
}
