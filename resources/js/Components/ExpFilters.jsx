/* eslint-disable prettier/prettier */
import { useState } from 'react';

export default function ExpFilters({ label, options, onSelect }) {
    const [selectedOption, setSelectedOption] = useState('All');
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
                className="my-2 rounded-md border border-paleBlack bg-allWhite px-4 py-2 text-allBlack"
            >
                {label}: {selectedOption || 'Select an option'}
            </div>
            {open && (
                <ul
                    tabIndex="0"
                    className="menu dropdown-content rounded-md border border-paleBlack bg-allWhite font-GRegular text-sm text-allBlack"
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
