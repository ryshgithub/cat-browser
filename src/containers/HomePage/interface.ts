import { RouteComponentProps } from 'react-router-dom';

export interface HomePageProps extends RouteComponentProps {}

export type CatBreedList = CatBreed[];

export interface CatBreed {
    id: string;
    name: string;
}

export type CatImageList = CatImage[];

export interface CatImage {
    id: string;
    url: string;
}

export interface QueryParamsBreedId {
    breedId: string;
    [key:string]: string;
}