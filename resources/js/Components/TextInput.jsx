/* eslint-disable prettier/prettier */
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

export default forwardRef(function TextInput(
    { type = 'text', className = '', isFocused = false, placeholder = '', ...props },
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
        <input
            {...props}
            type={type}
            placeholder={placeholder} // Added placeholder prop
            className={
                'rounded-sm bg-allWhite focus:bg-allWhite border-paleBlack text-allBlack shadow-sm focus:border-primary focus:ring-primary ' +
                className
            }
            ref={localRef}
        />
    );
});
