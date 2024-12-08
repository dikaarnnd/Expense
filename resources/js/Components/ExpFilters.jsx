/* eslint-disable prettier/prettier */
import { useState } from 'react';


export default function ExpFilters({ label, options, onSelect, icon: Icon }) {
    const [selectedOption, setSelectedOption] = useState(options[0]);
    const [open, setOpen] = useState(false);

    // Handle option selection and close dropdown
    const handleSelect = (option) => {
        setSelectedOption(option);
        onSelect(option); // Notify parent component of the change
        setOpen(false); // Close the dropdown
    };

    // Toggle dropdown visibility
    const toggleDropdown = () => setOpen(!open);

    return (
        <div className="dropdown bg-allWhite">
            
            <div
                tabIndex="0"
                role="button"
                onClick={toggleDropdown}
                className="flex justify-center items-center gap-2 my-2 rounded-md  border border-subheading shadow-md  bg-allWhite px-4 py-2 text-allBlack"
            >
                {Icon && <Icon className='text-paleBlack text-base'/>}
                {label} : {selectedOption || 'Select an option'}
            </div>
            {open && (
                <ul
                    tabIndex="0"
                    className="menu dropdown-content max-h-40 overflow-y-scroll block rounded-md  border border-subheading shadow-lg  bg-allWhite font-GRegular text-sm text-allBlack w-80 "
                >
                    {options.map((option) => (
                        <li key={option}>
                            <a onClick={() => handleSelect(option)}>{option}</a>
                        </li>
                    ))}
                </ul>
            )}

        </div>
    );
}
