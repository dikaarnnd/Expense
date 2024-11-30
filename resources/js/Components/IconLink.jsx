/* eslint-disable prettier/prettier */
import { Link } from "@inertiajs/react";

const IconLink = ({
    href,
    icon: Icon,
    size = '20px',
    target = '_self',
    className,
    children
}) => {
    return (
        <Link
            href={href}
            target={target} 
            className={`flex space-x-3 items-center text-paleBlack ${className}`}  // Use inline-flex to align icon and text side by side
            rel="noopener noreferrer"
            style={{
                fontSize: size,
                textDecoration: 'none',
                display: '',
                transition: 'color 0.2s ease, transform 0.2s ease',
            }}
            
        >
            <Icon />
            {children}
        </Link>
    );
};

export default IconLink;
