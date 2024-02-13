import { useEffect, useState } from "react";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalSection } from "./FunctionalSection";

import toast from "react-hot-toast";

import type { Dog } from "../types";
import { Requests } from "../api";

export function FunctionalApp() {
  const [allDogs, setAllDogs] = useState<Dog[]>([]);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeSelector, setActiveSelector] = useState<string>("all");

  //this func fetches dogs from db and updates state of allDogs with the fetched dogs array
  const refetchDogs = () => {
    setIsLoading(true);
    return Requests.getAllDogs()
      .then((dogs) => setAllDogs(dogs))
      .then(() => favsAndUnfavsCountArr())
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
  const handleActiveChange = (state: string) => {
    const newSelector = activeSelector === state ? "all" : state;
    setActiveSelector(newSelector);
  };

  //this func creates new dog in db, fetches all the dogs from db and updates state of allDogs
  const createDog = (dog: Omit<Dog, "id">) => {
    setIsLoading(true);
    Requests.postDog(dog).then(() => {
      refetchDogs()
        .then(() => {
          toast.success("Thanks for creating a new dog! 😃");
        })
        .finally(() => setIsLoading(false));
    });
  };

  const onTrashIconClick = (dog: Dog) => {
    setIsLoading(true);
    Requests.deleteDog(dog)
      .then(() => refetchDogs())
      .finally(() => setIsLoading(false));
  };

  const handleHeartClick = (dog: Dog, isFavorite: boolean) => {
    setIsLoading(true);
    const dogCopy = { ...dog, isFavorite };

    Requests.updateDog(dogCopy)
      .then(() => {
        setIsFavorite(isFavorite);
        return dog.isFavorite;
      })
      .then(() => refetchDogs())
      .finally(() => setIsLoading(false));
  };

  //this func displays the number of fav and unfav dogs on the fav and unfav tabs
  //used inside refetchDogs function and FunctionalSection component
  const favsAndUnfavsCountArr = () => {
    const favCount = () => {
      return allDogs.filter((dog) => {
        return dog.isFavorite === true;
      });
    };

    const unfavCount = () => {
      return allDogs.filter((dog) => {
        return dog.isFavorite === false;
      });
    };

    let countArr = [];
    countArr.push(favCount().length, unfavCount().length);
    return countArr;
  };

  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>

      <FunctionalSection
        favsAndUnfavsCountArr={favsAndUnfavsCountArr}
        handleActiveSelector={handleActiveChange}
        activeSelector={activeSelector}
      >
        {activeSelector === "all" ||
        activeSelector === "favorited" ||
        activeSelector === "unfavorited" ? (
          <FunctionalDogs
            displayDogs={dogList[activeSelector]}
            isLoading={isLoading}
            onTrashIconClick={onTrashIconClick}
            handleHeartClick={handleHeartClick}
          />
        ) : (
          <FunctionalCreateDogForm
            createDog={createDog}
            isLoading={isLoading}
            isFavorite={false}
          />
        )}
      </FunctionalSection>
    </div>
  );
}
