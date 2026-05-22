import React, { useState } from "react";

const InputField = ({ field, label, icon: Icon, formData, handleChange }) => {
  const [isFocused, setIsFocused] = useState(false);

  // Helper function to generate input classes dynamically
  const getInputClasses = (isTextArea = false) => {
    const baseClasses = `
      w-full p-4 rounded-xl bg-white/10 text-white placeholder-transparent 
      focus:outline-none focus:ring-2 focus:ring-[#14b8a6] focus:ring-offset-2 
      focus:ring-offset-[#031411] transition-all duration-300 peer text-sm
    `;

    // Mengubah efek glow shadow dan border hover ke warna Teal
    const hoverFocusClasses = isFocused
      ? "shadow-[0_4px_12px_rgba(20,184,166,0.25)] border-[#14b8a6]"
      : "border-white/20 hover:border-[#14b8a6]/50";

    return `${baseClasses} ${hoverFocusClasses} ${isTextArea ? "h-52 pt-12" : "pl-12"}`;
  };

  // Render input or textarea based on the field type
  const renderInputContent = () => {
    if (field === "message") {
      return (
        <textarea
          id={field}
          name={field}
          placeholder={label}
          value={formData[field]}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={getInputClasses(true)}
          required
        />
      );
    }

    return (
      <input
        id={field}
        type={field === "email" ? "email" : "text"}
        name={field}
        placeholder={label}
        value={formData[field]}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={getInputClasses()}
        required
      />
    );
  };

  return (
    <div className="relative w-full group">
      {/* Icon and Label (Aksen warna diubah ke Teal) */}
      <div className="absolute left-4 top-4 flex items-center space-x-2 text-gray-400 transition-colors group-hover:text-[#14b8a6]">
        <Icon className="w-5 h-5" />
        <label
          htmlFor={field}
          className={`
            absolute left-12 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm transition-all duration-300 
            peer-placeholder-shown:top-1/2 peer-placeholder-shown:translate-y-0 
            peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-base 
            peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-[#14b8a6] peer-focus:text-sm
          `}
        >
          {label}
        </label>
      </div>

      {/* Input or Textarea */}
      {renderInputContent()}

      {/* Focus/Hover Border Effect */}
      <div
        className={`
          absolute inset-0 border rounded-xl pointer-events-none 
          transition-all duration-300 
          ${isFocused ? "border-[#14b8a6]" : "border-transparent"}
        `}
      ></div>
    </div>
  );
};

export default InputField;
