import React, { useEffect, useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { CatAPI } from '../../apis/catAPI';
import { CatImagesContainer } from '../../components/CatImagesContainer';
import { getNewCatImagesFromNewResults } from '../../utils/catImagesUtils';
import { parseURLQueryParamsToObj } from '../../utils/helper';
import { DEFAULT_BREED_OPTION } from './constant';
import { CatBreedList, CatImageList, HomePageProps, QueryParamsBreedId } from './interface';
import './style.css';

export const HomePage: React.FC<HomePageProps> = ({ history, location }) => {
    const [catBreeds, setCatBreeds] = useState<CatBreedList>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedBreedId, setSelectedBreedId] = useState(DEFAULT_BREED_OPTION);
    const [currentPage, setCurrentPage] = useState(1);
    const [catImageList, setCatImageList] = useState<CatImageList>([]);
    const [allCatImagesLoaded, setAllCatImagesLoaded] = useState(false);

    const hasCatImageList = !!catImageList.length;
    const loadMoreButtonText = isLoading ? 'Loading cats...' : 'Load More';

    useEffect(() => {
        CatAPI.getBreeds()
            .then(breeds => {
                setCatBreeds(breeds);

                const queryParams = parseURLQueryParamsToObj<QueryParamsBreedId>(location.search);

                if (queryParams.breedId) {
                    setSelectedBreedId(queryParams.breedId)
                } else {
                    setIsLoading(false)
                }
            })
    }, []);

    useEffect(() => {
        if (selectedBreedId !== DEFAULT_BREED_OPTION) {
            setIsLoading(true);
            CatAPI.getCatsImagesByBreed(currentPage, selectedBreedId)
                .then(catImagesFromAPI => {
                    const newCatImages = getNewCatImagesFromNewResults(catImageList, catImagesFromAPI);

                    if (newCatImages.length) {
                        setCatImageList([...catImageList, ...newCatImages])
                    } else {
                        setAllCatImagesLoaded(true)
                    }
                })
                .finally(() => setIsLoading(false));
        }
    }, [selectedBreedId, currentPage]);

    const renderBreedOptions = () => {
        return [<option key={DEFAULT_BREED_OPTION}>{DEFAULT_BREED_OPTION}</option>]
            .concat(catBreeds.map(({ id, name }) => <option value={id} key={id}>{name}</option>));
    }

    const handleBreedOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedBreedId(e.currentTarget.value);
        setCatImageList([]);
        setCurrentPage(1);
        setAllCatImagesLoaded(false);
    }

    const handleLoadMoreOnClick = () => {
        setCurrentPage(currentPage + 1);
    }

    return (
        <div className="homepage container">
            <Row>
                <Col className="col-md-3 col-sm-6 col-12" >
                    <h1>Cat Browser</h1>
                    <Form.Group controlId="selectBreed">
                        <Form.Label>Breed</Form.Label>
                        <Form.Control onChange={handleBreedOnChange} value={selectedBreedId} disabled={isLoading} as="select">
                            {renderBreedOptions()}
                        </Form.Control>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <CatImagesContainer hasCatImageList={isLoading || hasCatImageList} catImageList={catImageList}  />
            </Row>
            {!allCatImagesLoaded && <Row>
                <Col className="col-12">
                    <Button onClick={handleLoadMoreOnClick} disabled={isLoading || !hasCatImageList} variant="success">{loadMoreButtonText}</Button>
                </Col>
            </Row>}
        </div>
    )
}