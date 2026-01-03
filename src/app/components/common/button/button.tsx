import Link from "next/link";
import styles from "./button.module.css";

// ------------------------------------------------------------------

type buttonSizes = "small" | "medium" | "large ";
type buttonVariants = "filled" | "outlined" | "text";

interface ButtonProps {
  size?: buttonSizes;
  variant?: buttonVariants;
  disabled?: boolean;
  href?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

// ------------------------------------------------------------------

export default function Button({
  size = "small",
  variant = "filled",
  disabled,
  href,
  onClick,
  children,
  style,
}: ButtonProps) {
  if (href) {
    return (
      <Link href={href}>
        <button
          className={`${styles.buttonRoot} ${
            styles[`button${size.charAt(0).toUpperCase() + size.slice(1)}`]
          } ${
            styles[
              `button${variant.charAt(0).toUpperCase() + variant.slice(1)}`
            ]
          }`}
          disabled={disabled}
          style={style}
        >
          {children}
        </button>
      </Link>
    );
  }

  return (
    <button
      className={`${styles.buttonRoot} ${
        styles[`button${size.charAt(0).toUpperCase() + size.slice(1)}`]
      } ${
        styles[`button${variant.charAt(0).toUpperCase() + variant.slice(1)}`]
      }`}
      onClick={onClick ? onClick : undefined}
      disabled={disabled}
      style={style}
    >
      {children}
    </button>
  );
}
