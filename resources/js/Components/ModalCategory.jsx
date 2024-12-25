/* eslint-disable prettier/prettier */
import { useState, useEffect } from 'react';
import { FaEdit } from "react-icons/fa";

import '../../css/others.css';

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {children}
          </div>
        </div>
    );
};

export default function ModalCategory({ categories = [], onSave }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [balance, setYourBalance] = useState("");
    const [checkedCategories, setCheckedCategories] = useState(
        categories.map((category) => ({
            ...category,
            isChecked: category.isChecked ?? false, // Gunakan status dari backend
        }))
    );

    const openModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => setIsModalOpen(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(checkedCategories);
        closeModal();
    };

    // Handle checkbox change
    const handleCheckboxChange = (id) => {
        setCheckedCategories((prev) =>
            prev.map((category) =>
                category.id === id
                    ? { ...category, isChecked: !category.isChecked }
                    : category
            )
        );
    };

    // Separate categories into checked and unchecked
    const checked = checkedCategories.filter((category) => category.isChecked);
    const unchecked = checkedCategories.filter((category) => !category.isChecked);

    return (
        <div>
            <FaEdit className='hover:cursor-pointer text-paleBlack text-lg rounded-md' onClick={openModal} />

            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <div className='flex justify-between items-start'>
                    <div className="min-h-20 mt-2 space-y-2">
                        <h1>Set your category preferences</h1>
                        <h2>Keep boxes checked to save your preferences</h2>
                    </div>
                    <div className="flex justify-end">
                        <button className="modal-close" onClick={closeModal}> &times; </button>
                    </div>
                </div>

                {/* Form with Flex styling */}
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    <div className="flex space-x-4 my-4 font-GLight">
                        {/* Checked Categories (grid-cols-2) */}
                        <div className="grid grid-cols-2 gap-4 max-h-48 overflow-y-auto ">
                            {checked.map((category) => (
                                <div key={category.id} className="flex items-center">
                                    <label className="flex items-center ">
                                        <input
                                            type="checkbox"
                                            checked={category.isChecked}
                                            onChange={() => handleCheckboxChange(category.id)}
                                        />
                                        <span className="ml-2">{category.emoji} {category.name}</span>
                                    </label>
                                </div>
                            ))}
                        </div>

                        {/* Unchecked Categories (grid-cols-1) */}
                        <div className="grid grid-cols-1 gap-4 max-h-48 overflow-y-auto">
                          {unchecked.map((category) => (
                            <div key={category.id} className="flex items-center">
                              <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={category.isChecked}
                                    onChange={() => handleCheckboxChange(category.id)}
                                />
                                <span className="ml-2">{category.emoji} {category.name}</span>
                              </label>
                            </div>
                          ))}
                        </div>
                    </div>

                    <div className="flex justify-end items-center">
                        <button className="confirmBtn">Save changes</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}

