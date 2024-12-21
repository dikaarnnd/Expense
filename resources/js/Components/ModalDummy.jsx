/* eslint-disable prettier/prettier */
import { useState } from 'react';
import { router } from '@inertiajs/react';

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

// Example component to demonstrate usage of Modal
export default function ModalDummy() {
    const [values, setValues] = useState({
        setBalance: "",
        plan_date: "Monthly",
        start_date: new Date().toISOString().split('T')[0],
        end_date: new Date(new Date().setDate(new Date().getDate() + 30)).toISOString().split('T')[0],
    });

    function handleChange(e) {
        const key = e.target.id || e.target.name;
        const value = e.target.value;

        setValues((values) => {
            if (key === "plan_date" && value === "Monthly") {
                return {
                    ...values,
                    plan_date: value,
                    start_date: new Date().toISOString().split('T')[0],
                    end_date: new Date(new Date().setDate(new Date().getDate() + 30)).toISOString().split('T')[0],
                };
            }

            if (key === "plan_date" && value === "Custom") {
                return {
                    ...values,
                    plan_date: value,
                    start_date: "",
                    end_date: "",
                };
            }

            return {
                ...values,
                [key]: value,
            };
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        router.post(route('balances.store'), values);
        // router.post('balances.store', values);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="setBalance">Balance:</label>
            <input id="setBalance" value={values.setBalance} onChange={handleChange} />

            <div>
                <label>
                    <input
                        type="radio"
                        name="plan_date"
                        value="Monthly"
                        checked={values.plan_date === "Monthly"}
                        onChange={handleChange}
                    />
                    Monthly
                </label>

                <label>
                    <input
                        type="radio"
                        name="plan_date"
                        value="Custom"
                        checked={values.plan_date === "Custom"}
                        onChange={handleChange}
                    />
                    Custom
                </label>
            </div>

            {values.plan_date === "Custom" && (
                <div>
                    <label htmlFor="start_date">Start Date:</label>
                    <input
                        type="date"
                        id="start_date"
                        value={values.start_date}
                        onChange={handleChange}
                    />

                    <label htmlFor="end_date">End Date:</label>
                    <input
                        type="date"
                        id="end_date"
                        value={values.end_date}
                        onChange={handleChange}
                    />
                </div>
            )}

            <button className="confirmBtn" type="submit">
                Submit
            </button>
        </form>
    );
}
