import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CatImageCardProps } from './interface';
import './style.css';

export const CatImageCard: React.FC<CatImageCardProps> = ({ id, url }) => {
    return (
        <Card className="cat-img-card">
            <Card.Img variant="top" src={url} />
            <Card.Body>
                <Link
                    to={`/${id}`}
                    className="btn btn-primary btn-block"
                >
                    View Details
                </Link>
            </Card.Body>
        </Card>
    )
}