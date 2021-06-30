import { RouteComponentProps } from 'react-router-dom';

interface CatImageDetailsPageRouteParams {
    catImageId: string;
}

export interface CatImageDetailsPageProps extends RouteComponentProps<CatImageDetailsPageRouteParams> {}

export interface CatImageDetails {
    id: string;
    url: string;
    breeds: CatImageBreed[];
}

export interface CatImageBreed {
    id: string;
    name: string;
    origin: string;
    temperament: string;
    description: string;
}