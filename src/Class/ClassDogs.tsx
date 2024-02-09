import { Component } from "react";
import { DogCard } from "../Shared/DogCard";
import type { DogsProps } from "../types";

export class ClassDogs extends Component<DogsProps, Record<string, never>> {

  render() {

    const {displayDogs, isLoading, onTrashIconClick, handleHeartClick} = this.props;

    return (
      <>
        {displayDogs.map((dog) => {
          return (
          <DogCard key={dog.id} dog={dog} isLoading={isLoading} trashClickHandler={onTrashIconClick} handleHeartClick={handleHeartClick}/>
          )
        })}        
      </>
    );
  }
}
