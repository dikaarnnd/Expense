/* eslint-disable prettier/prettier */
import { useState, useEffect } from 'react';
import { FaEdit } from "react-icons/fa";
import { router } from '@inertiajs/react';

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

export default function ModalCategory({ categories = []}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [checkedCategories, setCheckedCategories] = useState(categories);

    const openModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => setIsModalOpen(false);

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

    useEffect(() => {
      // Ensure the first 10 categories are marked as checked
      const mappedCategories = categories.map((category, index) => ({
        ...category,
        isChecked: index < 10, // Mark first 10 as checked
      }));
      setCheckedCategories(mappedCategories);
    }, [categories]);
    
    const handleSubmit = (e) => {
        e.preventDefault();

        const selectedCategories = checkedCategories.filter((category) => category.isChecked);

        const data = {
            categories: selectedCategories.map((category) => ({
                id: category.id,
                isChecked: category.isChecked,
            })),
        };

        router.post(route('category.update'), data, {
            onSuccess: () => {
                alert("Preferences successfully saved!");
                closeModal();
            },
            onError: (errors) => {
                console.error("Error saving preferences:", errors);
                alert("Failed to save preferences. Please try again.");
            },
        });
    };

    // Separate categories into checked and unchecked
    const checked = checkedCategories.filter((category) => category.isChecked);
    const unchecked = checkedCategories.filter((category) => !category.isChecked);

    return (
        <div>
            <FaEdit className='hover:cursor-pointer text-paleBlack text-lg rounded-md' onClick={() => setIsModalOpen(true)} />

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
                  <div className="grid grid-cols-2 gap-5 my-4 font-GLight">
                      {/* Checked Categories (grid-cols-2) */}
                      <div>
                        {checked.length > 0 ? (
                          <ul className="space-y-2 max-h-48 overflow-y-auto">
                            {checked.map((category) => (
                              <li key={category.id} className="flex items-center">
                                <label className="flex items-center">
                                  <input
                                      type="checkbox"
                                      checked={category.isChecked}
                                      onChange={() => handleCheckboxChange(category.id)}
                                  />
                                  <span className="ml-2">{category.emoji} {category.name}</span>
                                </label>
                              </li>
                            ))}
                          </ul>
                        ) : (
                            <p className="text-paleBlack text-sm">No categories selected yet.</p>
                        )}
                      </div>

                      {/* Unchecked Categories (grid-cols-1) */}
                      <div>
                        <ul className="space-y-2 max-h-48 overflow-y-auto">
                          {unchecked.map((category) => (
                            <li key={category.id} className="flex items-center">
                              <label className="flex items-center">
                                <input
                                  type="checkbox"
                                  checked={category.isChecked}
                                  onChange={() => handleCheckboxChange(category.id)}
                                />
                                  <span className="ml-2">{category.emoji} {category.name}</span>
                              </label>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex justify-end items-center">
                      <button className="confirmBtn" type='submit'>Save changes</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}

