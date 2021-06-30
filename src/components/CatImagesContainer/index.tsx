import React from 'react';
import { Col } from 'react-bootstrap';
import { CatImageCard } from '../CatImageCard';
import { CatImagesContainerProps } from './interface';

export const CatImagesContainer: React.FC<CatImagesContainerProps> = ({ hasCatImageList, catImageList }) => {

    return (
        <>
            {hasCatImageList ? catImageList.map(catImage => (
                <Col key={catImage.id} className="col-md-3 col-sm-6 col-12">
                    <CatImageCard {...catImage} />
                </Col>)
            ) : <Col className="col-12 no-cats-avail-label">No Cats Available</Col>}
        </>
    )
}