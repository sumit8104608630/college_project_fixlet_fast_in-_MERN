import React, { useEffect, useRef, useState } from "react";

function OtpInput({ length = 4,email, onclick }) {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRef = useRef([]);

  useEffect(() => {
    if (inputRef.current[0]) {
      inputRef.current[0].focus();
    }
  }, []);

  const handleChange = (index, e) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.length > 1 ? value[value.length - 1] : value;
    setOtp(newOtp);

    const otpValue = newOtp.join("");
    if (otpValue.length === length && /^[0-9]+$/.test(otpValue)) onclick(otpValue,email);

    

    if (value && index < length -1 && inputRef.current[index + 1]) {
      inputRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      if (otp[index]) {
        newOtp[index] = ""; // Clear current input
        setOtp(newOtp);
      } else if (index > 0 && inputRef.current[index - 1]) {
        newOtp[index - 1] = ""; // Clear the previous input
        setOtp(newOtp);
        inputRef.current[index - 1].focus();
      }
    }
  };

  const handleClick = (index) => {
    const input = inputRef.current[index];
    input.setSelectionRange(input.value.length, input.value.length);
  };

  return (
    <div className="flex w-full justify-center gap-2">
      {otp.map((value, index) => (
        <input
          key={index}
          size={1}
          ref={(input) => (inputRef.current[index] = input)}
          type="text"
          value={value}
          onChange={(e) => handleChange(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onClick={() => handleClick(index)}
          maxLength={1}
          autoComplete="off"
          inputMode="numeric"
          className="border text-center border-gray-400 rounded focus:outline-none"
        />
      ))}
    </div>
  );
}

export default OtpInput;
