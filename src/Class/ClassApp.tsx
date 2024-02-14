import { Component } from "react";
import { ClassSection } from "./ClassSection";
import { ClassDogs } from "./ClassDogs";
import { ClassCreateDogForm } from "./ClassCreateDogForm";

import toast from "react-hot-toast";

import type { Dog } from "../types";
import type { ActiveSelector } from "../types";
import { Requests } from "../api";

import type { ClassAppState } from "../types";

export class ClassApp extends Component<Record<never, never>, ClassAppState> {
  state: ClassAppState = {
    allDogs: [],
    isLoading: false,
    activeSelector: "all",
  };

  //this func fetches dogs from db and updates state of allDogs with the fetched dogs array
  //called inside componentDidMount
  refetchDogs = () => {
    this.setState({
      ...this.state,
      isLoading: true,
    });

    return Requests.getAllDogs()
      .then((dogs) => {
        this.setState({
          ...this.state,
          allDogs: dogs,
        });
      })
      .finally(() => {
        this.setState({
          isLoading: false,
        });
      });
  };

  //this func changes activeSelector state and displays the list of dogs as per active selector
  //if a tab is already active and displaying it's list, clicking that tab again will remove it's active status and the full list of dogs will be displayed
  handleActiveSelector = (state: ActiveSelector) => {
    const newSelector = this.state.activeSelector === state ? "all" : state;
    this.setState({
      ...this.state,
      activeSelector: newSelector,
    });
  };

  //this func creates new dog in db, fetches all the dogs from db and updates state of allDogs
  createDog = (dog: Omit<Dog, "id">) => {
    this.setState({
      ...this.state,
      isLoading: true,
    });
    Requests.postDog(dog).then(() => {
      this.refetchDogs()
        .then(() => {
          toast.success("Thanks for creating a new dog! 😃");
        })
        .finally(() =>
          this.setState({
            isLoading: false,
          })
        );
    });
  };

  onTrashIconClick = (dog: Dog) => {
    this.setState({
      ...this.state,
      isLoading: true,
    });
    Requests.deleteDog(dog)
      .then(() => this.refetchDogs())
      .finally(() =>
        this.setState({
          isLoading: false,
        })
      );
  };

  handleHeartClick = (dog: Dog, isFavorite: boolean) => {
    this.setState({
      ...this.state,
      isLoading: true,
    });

    const dogCopy = { ...dog, isFavorite };

    Requests.updateDog(dogCopy)
      .then(() => {
        return dog.isFavorite;
      })
      .then(() => this.refetchDogs())
      .finally(() =>
        this.setState({
          isLoading: false,
        })
      );
  };

  componentDidMount() {
    this.refetchDogs();
  }

  render() {
    const { allDogs, isLoading, activeSelector } = this.state;

    const {
      handleActiveSelector,
      createDog,
      onTrashIconClick,
      handleHeartClick,
    } = this;

    const favoriteDogList = allDogs.filter((dog) => dog.isFavorite);
    const notFavoriteDogList = allDogs.filter((dog) => !dog.isFavorite);

    const dogList = {
      all: allDogs,
      favorited: favoriteDogList,
      unfavorited: notFavoriteDogList,
    };

    const counts = {
      favs: allDogs.filter((dog) => {
          return dog.isFavorite === true;
        }).length,
  
      unfavs: allDogs.filter((dog) => {
          return dog.isFavorite === false;
        }).length
    };

    return (
      <div className="App" style={{ backgroundColor: "goldenrod" }}>
        <header>
          <h1>pup-e-picker (Class Version)</h1>
        </header>

        <ClassSection
          favoritesCount={counts.favs}
          unfavoritesCount={counts.unfavs}
          handleActiveSelector={handleActiveSelector}
          activeSelector={activeSelector}
        >
          {activeSelector === "createDog" ? (
          <ClassCreateDogForm
            createDog={createDog}
            isLoading={isLoading}
            isFavorite={false}
          />
        ) : (
          <ClassDogs
            displayDogs={dogList[activeSelector]}
            isLoading={isLoading}
            onTrashIconClick={onTrashIconClick}
            handleHeartClick={handleHeartClick}
          />
        )}
        </ClassSection>
      </div>
    );
  }
}
