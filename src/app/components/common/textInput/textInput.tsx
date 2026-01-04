import styles from "./textInput.module.css";

import React from "react";

// ------------------------------------------------------------------

/**
 * Represents the different variants available for the TextInput component.
 */
type TextInputVariant = "outlined" | "filled";

/**
 * Represents the different sizes available for the TextInput component.
 */
type TextInputSize = "small" | "medium" | "large";

/**
 * Represents the different input types available for the TextInput component.
 */
type TextInputTypes = "text" | "password" | "email" | "number";

// ------------------------------------------------------------------

interface TextInputProps {
  variant?: TextInputVariant;
  size?: TextInputSize;
  placeholder?: string;
  disabled?: boolean;
  type?: TextInputTypes;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  style?: React.CSSProperties;
  fullWidth?: boolean;
  rounded?: boolean;
}

// ------------------------------------------------------------------

export default function TextInput({
  variant = "outlined",
  size = "medium",
  placeholder = "Enter text...",
  disabled = false,
  type = "text",
  value,
  onChange,
  style,
  fullWidth = false,
  rounded = false,
}: TextInputProps) {
  return (
    <input
      className={`${styles.textInputRoot} ${
        styles[`textInput${size.charAt(0).toUpperCase() + size.slice(1)}`]
      } ${
        styles[`textInput${variant.charAt(0).toUpperCase() + variant.slice(1)}`]
      }`}
      type={type}
      placeholder={placeholder}
      disabled={disabled}
      value={value}
      onChange={onChange}
      style={{
        ...style,
        flex: fullWidth ? 1 : undefined,
        borderRadius: rounded ? "9999px" : undefined,
      }}
    />
  );
}
