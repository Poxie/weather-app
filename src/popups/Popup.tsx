import React, { useEffect, useRef } from 'react';

interface Props {
    top: number;
    left: number;
    children: any;
}
export const Popup: React.FC<Props> = ({left, top, children}) => {
    const popupRef: any = useRef(null);

    useEffect(() => {
        if(!popupRef.current) return;
        popupRef.current.style.left = left - (popupRef.current.offsetWidth / 2)+ 'px';
        popupRef.current.style.opacity = 1;
    }, []);

    return(
        <div className="popup" style={{top: top - 25 + 'px'}} ref={popupRef}>
            <div className="popup-content">
                {children}
            </div>
        </div>
    )
}