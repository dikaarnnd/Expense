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

export default function ModalCategory() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [balance, setYourBalance] = useState("");

    const openModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => setIsModalOpen(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (balance) {
            closeModal();
        }
    };

    const categories = [
        { id: 1, emoji: "🏠", name: "Housing" },
        { id: 2, emoji: "📚", name: "Education" },
        { id: 3, emoji: "🧳", name: "Travel" },
        { id: 4, emoji: "🚗", name: "Transportation" },
        { id: 5, emoji: "📳", name: "Transfer" },
        { id: 6, emoji: "🧃", name: "Groceries" },
        { id: 7, emoji: "🍔", name: "Food" },
        { id: 8, emoji: "🛠️", name: "Repairs" },
        { id: 9, emoji: "🕹️", name: "Gadgets" },
        { id: 10, emoji: "🎬", name: "Entertainment" },
        { id: 11, emoji: "🛍️", name: "Shopping" },
        { id: 12, emoji: "📑", name: "Subscriptions" },
        { id: 13, emoji: "💪", name: "Health & Fitness" },
        { id: 14, emoji: "📱", name: "Phone & Internet" },
        { id: 15, emoji: "🛒", name: "Online Shop" },
    ];

    const [checkedCategories, setCheckedCategories] = useState(
        categories.map((category, index) => ({
            ...category,
            isChecked: index < 10, // Check first 10 categories
        }))
    );

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
    const checked = checkedCategories.filter(category => category.isChecked);
    const unchecked = checkedCategories.filter(category => !category.isChecked);

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

