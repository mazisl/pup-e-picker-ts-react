import type { Dog } from "./types";

export const baseUrl = "http://localhost:3000";

export const Requests = {
  // should return a promise with all dogs in the database
  getAllDogs: (): Promise<Dog[]> => fetch(`${baseUrl}/dogs`).then((response) => {
    if (!response.ok) {
      throw new Error('Could not get dogs!')
    }
    return response;
  })
  .then((response) => response.json()),

  // should create a dog in the database from a partial dog object
  // and return a promise with the result
  postDog: (dog: Omit<Dog, 'id'>) => {
    return fetch(`${baseUrl}/dogs`, {
      body: JSON.stringify(dog),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Could not post dog!')
      }
      return response;
    })
    .then((response) => response.json())
  },

  // should delete a dog from the database
  deleteDog: (dog: Dog) => {
    return fetch(`${baseUrl}/dogs/${dog.id}`, {
      method: 'DELETE',
    })
    .then((response) => {
      if (!response.ok) throw new Error('Failed to delete dog');
    })
    // .then((response) => response.json())
  },

  updateDog: (dog: Dog) => {
    return fetch(`${baseUrl}/dogs/${dog.id}`, {
      body: JSON.stringify(dog),
      method: 'PATCH',
      headers: {
        ['Content-Type']: 'application/json'
      },
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to update dog!')
      }
      return response;
    })
    .then((response) => response.json());
  }
};
