import React, { useEffect, useRef } from 'react';
import { Alert } from 'react-bootstrap';
import { ErrorAlertProps } from './interface';
import ReactDOM from 'react-dom';
import './style.css';

export const ErrorAlert: React.FC<ErrorAlertProps> = ({ errorMessage, show, onClose }) => {
    const root = useRef(document.querySelector('#root') as HTMLDivElement);
    const el = useRef(document.createElement('div'));

    useEffect(() => {
        root.current.appendChild(el.current);

        return function cleanup() {
            root.current.removeChild(el.current);
        }
    }, []);

    return show ? ReactDOM.createPortal(
        <div className="error-alert-container">
            <Alert
                show={true}
                transition={true}
                variant="danger"
                dismissible={true}
                onClose={onClose}
            >
                {errorMessage}
            </Alert>
        </div>,
        el.current
    ) : null;
}