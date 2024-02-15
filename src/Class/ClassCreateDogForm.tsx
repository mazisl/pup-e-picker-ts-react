import { Component } from "react";
import { dogPictures } from "../dog-pictures";
import type { CreateDogFormProps } from "../types";

interface ClassCreateDogFormState {
  nameInput: string;
  descriptionInput: string;
  dogImage: string;
}

// use this as your default selected image
const defaultImage = dogPictures.BlueHeeler;

export class ClassCreateDogForm extends Component<CreateDogFormProps, ClassCreateDogFormState> {
  state: ClassCreateDogFormState = {
    nameInput: "",
    descriptionInput: "",
    dogImage: defaultImage,
  };

  render() {
    const { createDog, isLoading } = this.props;
    const { nameInput, descriptionInput, dogImage } = this.state;

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
            isFavorite: false
          }).then(() => {
            this.setState(() => {
              return { nameInput: "" };
            });
            this.setState(() => {
              return { descriptionInput: "" };
            });
            this.setState(() => {
              return { dogImage: defaultImage };
            });
          });
        }}
      >
        <h4>Create a New Dog</h4>
        <label htmlFor="name">Dog Name</label>
        <input
          id="name"
          type="text"
          value={nameInput}
          onChange={(e) => this.setState({ nameInput: e.target.value })}
          disabled={isLoading}
        />

        <label htmlFor="description">Dog Description</label>
        <textarea
          name=""
          id="description"
          value={descriptionInput}
          onChange={(e) => this.setState({ descriptionInput: e.target.value })}
          cols={80}
          rows={10}
          disabled={isLoading}
        ></textarea>

        <label htmlFor="picture">Select an Image</label>
        <select
          id=""
          onChange={(e) => this.setState({ dogImage: e.target.value })}
        >
          {Object.entries(dogPictures).map(([label, pictureValue]) => {
            return (
              <option value={pictureValue} key={pictureValue}>
                {label}
              </option>
            );
          })}
        </select>
        <input type="submit" disabled={isLoading} />
      </form>
    );
  }
}
