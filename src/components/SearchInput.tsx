import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

export const SearchInput = () => {
    const [query, setQuery] = useState('');
    const [redirect, setRedirect]: any = useState(null);

    useEffect(() => {
        if(!redirect) return;
        setRedirect(null);
    }, [redirect]);

    if(redirect) {
        return redirect;
    }

    return(
        <div className="search-input">
            <form onSubmit={(e) => {
                e.preventDefault();
                setRedirect(<Redirect to={`/weather/today/${query}`} push />);
            }}>
                <input 
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={'Search location...'}
                />
            </form>
        </div>
    )
}