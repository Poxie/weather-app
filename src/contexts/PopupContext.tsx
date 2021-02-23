import React, { useContext, useEffect, useState } from 'react';
import '../popups/Popups.css';

// @ts-ignore
const PopupContext = React.createContext();

export const usePopups = () => {
    return useContext(PopupContext);
}

interface Props {
    children: any;
}
export const PopupProvider: React.FC<Props> = ({children}) => {
    const [popup, setPopup] = useState(null);

    const value = {
        popup,
        setPopup
    }

    return(
        <PopupContext.Provider value={value}>
            {children}
            <div className="popups">
                {popup}
            </div>
        </PopupContext.Provider>
    )
}