/* eslint-disable prettier/prettier */
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

export default forwardRef(function TextInput(
    { type = 'text', className = '', isFocused = false, placeholder = '', label, tip, showLabelTip = false, ...props },
    ref,
) {
    const localRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <>
            {showLabelTip && (
                <div className="flex space-x-10 justify-between ">
                    {label && (
                        <div className="flex-col">
                            <p className="inputLabel">{label}</p>
                            {tip && <p className="tipLabel">{tip}</p>}
                        </div>
                    )}
                    <input
                        {...props}
                        type={type}
                        placeholder={placeholder}
                        className={
                            'rounded-sm bg-allWhite focus:bg-allWhite border-paleBlack text-allBlack shadow-sm focus:border-primary focus:ring-primary ' +
                            className
                        }
                        ref={localRef}
                    />
                </div>
            )}
            {!showLabelTip && (
                <input
                    {...props}
                    type={type}
                    placeholder={placeholder}
                    className={
                        'rounded-sm bg-allWhite focus:bg-allWhite border-paleBlack text-allBlack shadow-sm focus:border-primary focus:ring-primary ' +
                        className
                    }
                    ref={localRef}
                />
            )}
        </>
    );
});
