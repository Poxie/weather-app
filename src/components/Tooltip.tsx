import { useEffect, useState } from "react"
import './Tooltip.css';

interface Props {
    text: any;
    children: any;
    closeOnClick?: boolean;
}
export const Tooltip: React.FC<Props> = ({text, children, closeOnClick}) => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        return () => setOpen(false);
    }, []);

    const handleMouseEnter = () => {
        setOpen(true);
    }
    const handleMouseLeave = () => {
        setOpen(false);
    }
    
    return(
        <div 
            className="has-tooltip"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {open ? (
                <div className="tooltip">
                    {text}
                </div>
            ) : null}
            {children}
        </div>
    )
}