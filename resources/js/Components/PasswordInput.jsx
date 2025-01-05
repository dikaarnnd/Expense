/* eslint-disable prettier/prettier */
import { useState } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

const PasswordInput = ({value, onChange, autoComplete}) => {
  const [password, setPassword] = useState("");
  const [type, setType] = useState("password");

  const handleToggle = () => {
    setType((prevType) => (prevType === "password" ? "text" : "password"));
  };

  return (
    <div className="relative w-full">
      <input
        type={type}
        name="password"
        placeholder="Password"
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        className="mt-1 text-allBlack border border-paleBlack bg-allWhite focus:bg-allWhite rounded-sm w-full pr-10 focus:border-primary focus:ring-primary"
      />
      <span
        className="absolute inset-y-0 right-4 flex items-center cursor-pointer text-paleBlack"
        onClick={handleToggle}
      >
        {type === "password" ? (
          <IoEyeOffOutline size={20} />
        ) : (
          <IoEyeOutline size={20} />
        )}
      </span>
    </div>
  );
};

export default PasswordInput;
