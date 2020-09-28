import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

interface PageHeaderProps {
    home: string;
    countrieList: string;
    contact?: boolean;
}

const PageHeader:React.FC<PageHeaderProps> = ({contact, home, countrieList}) => {
    return (
        <header>
            <Link to={home} rel="noopener noreferrer">Home</Link>
            <Link to={{ pathname: "https://github.com/apilayer/restcountries" }} target="_blank" rel="noopener noreferrer">View on Github</Link>
            <Link to={{ pathname: "https://restcountries.eu/#rest-countries" }} target="_blank" rel="noopener noreferrer">Docs API</Link>
            <Link to={countrieList} rel="noopener noreferrer">Get Countries</Link>
            {contact && <a href="/#fim"  rel="noopener noreferrer">Contact US</a>}
        </header>
    );
}

export default PageHeader;