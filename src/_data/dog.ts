import { AxiosResponse } from 'axios';
import { DogImage, DogBreeds } from '../types/types.type';

const { faker } = require('@faker-js/faker');
const axios = require('axios');
const subtractYears = require('../utils/date');

const getDogPicture = async (breed: string, type?: string) => {
  if (typeof type !== 'undefined') {
    const { data }: AxiosResponse<DogImage> = await axios.get(
      `https://dog.ceo/api/breed/${breed}/${type}/images/random`
    );
    const message = data.message;
    return message;
  }

  const { data }: AxiosResponse<DogImage> = await axios(
    `https://dog.ceo/api/breed/${breed}/images/random`
  );
  const message = data.message;
  return message;
};

const specifyBreedTypes = async (breed: string, element: string) => {
  const breedTypes = [];
  for (const type of element) {
    breedTypes.push({
      breed: `${type} ${breed}`,
      photoUrl: await getDogPicture(breed),
    });
  }
  return breedTypes;
};

const listDogBreeds = async (data: string[]) => {
  const listSpecificDogBreeds = [];
  for (const breed in data) {
    const element = data[breed];
    if (element.length === 0) {
      listSpecificDogBreeds.push({
        breed,
        photoUrl: await getDogPicture(breed),
      });
    } else {
      listSpecificDogBreeds.push(...(await specifyBreedTypes(breed, element)));
    }
  }
  return listSpecificDogBreeds;
};

const getDogBreeds = async () => {
  const { data }: AxiosResponse<DogBreeds> = await axios.get(
    'https://dog.ceo/api/breeds/list/all'
  );

  return await listDogBreeds(data.message);
};

const createDogPool = async () => {
  const dogPool = [];
  const dogProfiles = await getDogBreeds();

  for (let index = 0; index < 1000; index++) {
    const typeOfDog = faker.helpers.arrayElement(dogProfiles);
    const name = faker.name.firstName();
    const age = faker.datatype.number({ min: 1, max: 15 });
    const birthday = subtractYears(age);
    const breed = typeOfDog.breed;
    const photoUrl = !dogProfiles.find(
      (dog) => dog.photoUrl === typeOfDog.photoUrl
    )
      ? typeOfDog.photoUrl
      : typeOfDog.breed.split(' ').length === 2
      ? await getDogPicture(
          typeOfDog.breed.split(' ')[1],
          typeOfDog.breed.split(' ')[0]
        )
      : await getDogPicture(typeOfDog.breed);

    dogPool.push({
      name,
      age,
      birthday,
      breed,
      photoUrl,
    });
    console.log(index);
  }

  return dogPool;
};

module.exports = createDogPool;
