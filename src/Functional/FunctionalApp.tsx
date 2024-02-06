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
  const [currentView, setCurrentView] = useState<Dog[]>(allDogs);
  const [activeSelector, setActiveSelector] = useState<string>('');

  console.log(activeSelector);

  //this func fetches dogs from db and updates state of allDogs with the fetched dogs array
  const refetchDogs = () => {
    setIsLoading(true);
    return Requests.getAllDogs()
      .then((dogs) => setAllDogs(dogs))
      .then(() => favsAndUnfavsCountArr())
      .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    refetchDogs();
  }, [])

  useEffect(() => {
    const allDogsCopy = allDogs.map((dog) => dog);
    setCurrentView(allDogsCopy);
  }, [allDogs])

  //this func creates new dog in db, fetches all the dogs from db and updates state of allDogs
  const createDog = (dog: Omit<Dog, 'id'>) => {
    setIsLoading(true);
    Requests.postDog(dog).then(() => {
      refetchDogs().then(() => {
        toast.success('Thanks for creating a new dog! 😃')
      })
      .finally(() => setIsLoading(false));
    })
  }

  const onTrashIconClick = (dog: Dog) => {
    setIsLoading(true);
    Requests.deleteDog(dog).then(() => refetchDogs())
      .finally(() => setIsLoading(false))
  }

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
  //used inside FunctionalSection component
  const favsAndUnfavsCountArr = () => {

    const favCount = () => {
      return allDogs.filter((dog) => {
        return dog.isFavorite === true;
      }
    )}
  
    const unfavCount = () => {
      return allDogs.filter((dog) => {
        return dog.isFavorite === false;
      }
    )}

    let countArr = [];
    countArr.push(favCount().length, unfavCount().length);
    return countArr;
  }
  
  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      
      <FunctionalSection favsAndUnfavsCountArr={favsAndUnfavsCountArr} allDogs={allDogs} setCurrentView={setCurrentView} activeSelector={activeSelector} setActiveSelector={setActiveSelector}>

        {activeSelector === '' || activeSelector === 'Favorited' || activeSelector === 'Unfavorited' ? (
          <FunctionalDogs displayDogs={currentView} isLoading={isLoading} onTrashIconClick={onTrashIconClick} handleHeartClick={handleHeartClick} />
        ) : (
          <FunctionalCreateDogForm createDog={createDog} isLoading={isLoading} isFavorite={isFavorite} />
        )}

      </FunctionalSection>
    </div>
  );
}
