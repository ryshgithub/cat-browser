import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { CatAPI } from '../../apis/catAPI';
import { ErrorAlert } from '../../components/ErrorAlert';
import { CatImageDetails, CatImageDetailsPageProps } from './interface';

/**
 * Cat Image Details Page Component
 * Shows all the details about the cat image
 */
export const CatImageDetailsPage: React.FC<CatImageDetailsPageProps> = ({ match, history }) => {
    let renderUI: React.ReactNode;
    const [catImageDetails, setCarImageDetails] = useState<CatImageDetails | null>(null);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        CatAPI.getCatImageDetails(match.params.catImageId)
            .then(data => setCarImageDetails(data))
            .catch(() => setHasError(true));
    },[])

    if (!catImageDetails) {
        renderUI = null;
    } else {
        const { url, breeds } = catImageDetails;
        const { name, origin, temperament, description, id: breedId } = breeds[0];

        const handleBackButtonClick = () => {
            history.push(`/?breedId=${breedId}`);
        }

        renderUI = (
            <Card>
                <Card.Header>
                    <Button onClick={handleBackButtonClick} variant="primary">Back</Button>
                </Card.Header>
                <Card.Img variant="top" src={url} />
                <Card.Body>
                    <h4>{name}</h4>
                    <h5>Origin: {origin}</h5>
                    <h6>{temperament}</h6>
                    <p>{description}</p>
                </Card.Body>
            </Card>
        );
    }

    const handleOnCloseAlert = () => {
        setHasError(false);
    }

    return (
        <div className="CatImageDetailsPage container">
            {renderUI}
            <ErrorAlert
                onClose={handleOnCloseAlert}
                show={hasError}
                errorMessage="Apologies but we could not load this cat at this time! Miau!"
            />
        </div>
    )
}