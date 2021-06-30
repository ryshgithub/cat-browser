import axios from 'axios';
import { CatImageDetails } from '../containers/CatImageDetailsPage/interface';
import { CatBreedList, CatImageList } from '../containers/HomePage/interface';

export class CatAPI {
    static getBreeds = async () => {
        const axiosResp = await axios.get<CatBreedList>('https://api.thecatapi.com/v1/breeds');

        return axiosResp.data;
    }

    static getCatsImagesByBreed = async (page: number, breed_id: string) => {
        const axiosResp = await axios.get<CatImageList>(`https://api.thecatapi.com/v1/images/search?page=${page}&limit=10&breed_id=${breed_id}`);

        return axiosResp.data;
    }

    static getCatImageDetails = async (imageId: string) => {
        const axiosResp = await axios.get<CatImageDetails>(`https://api.thecatapi.com/v1/images/${imageId}`);

        return axiosResp.data;
    }
}