import { useState } from "react";
import { dogPictures } from "../dog-pictures";
import type { CreateDogFormProps } from "../types";

// use this as your default selected image
const defaultImage = dogPictures.BlueHeeler;

export const FunctionalCreateDogForm = ({createDog, isLoading, isFavorite}: CreateDogFormProps) => {

  console.log(dogPictures);
  console.log(Object.keys(dogPictures));
  console.log(Object.values(dogPictures));

  const [nameInput, setNameInput] = useState<string>('');
  const [descriptionInput, setDescriptionInput] = useState<string>('');
  const [dogImage, setDogImage] = useState<string>(defaultImage);

  return (
    <form
      action=""
      id="create-dog-form"
      onSubmit={(e) => {
        e.preventDefault();
        createDog({ 
          name: nameInput,
          image: dogImage,
          description: descriptionInput,
          isFavorite: isFavorite
        })
        console.log(dogImage);
        setNameInput('');
        setDescriptionInput('');
        setDogImage(defaultImage);
      }}
      >
      <h4>Create a New Dog</h4>
      <label htmlFor="name">Dog Name</label>
      <input id="name" type="text" value={nameInput} onChange={(e) => setNameInput(e.target.value)} disabled={isLoading} />

      <label htmlFor="description">Dog Description</label>
      <textarea name="" id="description" value={descriptionInput} onChange={(e) => setDescriptionInput(e.target.value)} cols={80} rows={10} disabled={isLoading}></textarea>

      <label htmlFor="picture">Select an Image</label>
      <select id="" onChange={(e) => setDogImage(e.target.value)}>
        {Object.entries(dogPictures).map(([label, pictureValue]) => {
          return (
            <option value={pictureValue} key={pictureValue}>
              {label}
            </option>
          );
        })}
      </select>
      <input type="submit" disabled={isLoading}/>
    </form>
  );
};
