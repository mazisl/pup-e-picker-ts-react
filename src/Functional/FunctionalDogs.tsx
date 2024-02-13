import { DogCard } from "../Shared/DogCard";

// import type { Dog } from "../types";
import type { DogsProps } from "../types";

// Right now these dogs are constant, but in reality we should be getting these from our server
export const FunctionalDogs = ({
  displayDogs,
  isLoading,
  onTrashIconClick,
  handleHeartClick,
}: DogsProps) => {
  return (
    <>
      {displayDogs.map((dog) => {
        return (
          <DogCard
            key={dog.id}
            dog={dog}
            isLoading={isLoading}
            trashClickHandler={onTrashIconClick}
            handleHeartClick={handleHeartClick}
          />
        );
      })}
    </>
  );
};
