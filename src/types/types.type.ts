import { Types } from 'mongoose';
import { Request, Response } from 'express';

export interface Pet {
  name: string;
  age: Number;
  birthday: Date;
  breed: string;
  photoUrl: string;
  createdAt: Date;
}

export interface Desserts {
  name: string;
  category: string;
  photoUrl: string;
  photoAttribute: string;
  description: string;
  createdAt: Date;
}

export interface Museum {
  name: string;
  location: string;
  coordinates: string;
  type: string;
  category: string;
  photoUrl: string;
  photoAttribute: string;
  website: string;
  createdAt: Date;
}

export interface CatImageAPI {
  id: string;
  url: string;
  width: number;
  height: number;
  breeds: any[];
  favourite: any;
}

export interface CatBreedAPI {
  weight: {
    imperial: string;
    metric: string;
  };
  id: string;
  name: string;
  cfa_url: string;
  vetstreet_url: string;
  vcahospitals_url: string;
  temperament: string;
  origin: string;
  country_codes: string;
  country_code: string;
  description: string;
  life_span: string;
  indoor: number;
  lap: number;
  alt_names?: string;
  adaptability: number;
  affection_level: number;
  child_friendly: number;
  dog_friendly: number;
  energy_level: number;
  grooming: number;
  health_issues: number;
  intelligence: number;
  shedding_level: number;
  social_needs: number;
  stranger_friendly: number;
  vocalisation: number;
  experimental: number;
  hairless: number;
  natural: number;
  rare: number;
  rex: number;
  suppressed_tail: number;
  short_legs: number;
  wikipedia_url: string;
  hypoallergenic: number;
  reference_image_id: string;
}

export interface CatPool {
  name: string;
  age: number;
  birthday: Date;
  breed: string;
  photoUrl: string;
}

export interface DogImage {
  message: string;
  status: string;
}

export interface DogBreeds {
  message: string[];
  status: string;
}

export interface Req extends Request {
  query: {
    select?: string;
    sort?: string;
    page?: string;
    limit?: string;
  };
}

export interface Pagination {
  total: number;
  totalPages: number;
  next?: { page: number; limit: number };
  prev?: { page: number; limit: number };
}

export interface Res extends Response {
  filteredResults?: {
    success: boolean;
    count: number;
    pagination: Pagination;
    data: any; // ! fix this
  };
}

export interface Error {
  statusCode?: number;
}
