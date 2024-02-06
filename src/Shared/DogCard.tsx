// import type { Dog } from "../types";
import type { DogCardProps } from "../types";
import { FavoriteButton } from "./FavoriteButton";
import { TrashButton } from "./TrashButton";
import { UnfavoriteButton } from "./UnfavoriteButton";
import type { Dog } from "../types";

// ! Do Not Make Changes To This File
export const DogCard = ({dog, trashClickHandler, handleHeartClick, isLoading}: DogCardProps) => {

  const onEmptyHeartClick = (dog: Dog) => {
    handleHeartClick(dog, true);
  };
  
  const onHeartClick = (dog: Dog) => {
    handleHeartClick(dog, false);
  };

  return (
    <div className="dog-card">
      {/* Choose which button to show depending on if dog is a favorite */}
      {dog.isFavorite ? (
        <UnfavoriteButton
          onClick={() => {
            onHeartClick(dog);
          }}
          disabled={isLoading}
        />
      ) : (
        <FavoriteButton
          onClick={() => {
            onEmptyHeartClick(dog);
          }}
          disabled={isLoading}
        />
      )}

      {/* Use this button to delete a puppy :( */}
      <TrashButton
        onClick={() => {
          trashClickHandler(dog);
        }}
        disabled={isLoading}
      />

      {/* Ignore this  */}
      {/* You can temporarily set a favorite overlay after a user favorites a dog */}
      {/* Try making className "favorite-overlay active"*/}
      <div className={`favorite-overlay `}>{"<3"}</div>

      {/* Ignore this  */}
      {/* You can temporarily set a favorite overlay after a user favorites a dog */}
      {/* Try making className "favorite-overlay active"*/}
      {isLoading && <div className={`loading-overlay`}></div>}

      {/* Ignore this  */}
      {/* You can temporarily set a unfavorite overlay after a user favorites a dog */}
      {/* Try making className "unfavorite-overlay active"*/}
      <div className="unfavorite-overlay">{"</3"}</div>

      {/* A Dogs Name */}
      <p className="dog-name">{dog.name}</p>

      {/* A Dogs Image */}
      <img src={dog.image} alt={dog.name} />

      {/*  A Dogs description*/}
      <p className="dog-description">{dog.description}</p>
    </div>
  );
};
