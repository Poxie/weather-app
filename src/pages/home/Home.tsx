import React from 'react';
import { SearchInput } from '../../components/SearchInput';
import { Favorites } from './Favorites';
import './Home.css';

export const Home = () => {
    return(
        <div className="home flex align-center justify-center">
            <div className="container flex column align-center">
                <div className="search-container">
                    <SearchInput />
                </div>
                <Favorites />
            </div>
        </div>
    )
}