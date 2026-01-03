import styles from "./iconButton.module.css";

// ------------------------------------------------------------------

interface IconButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
}

// ------------------------------------------------------------------

export default function IconButton({ onClick, children }: IconButtonProps) {
  return (
    <button className={styles.iconButtonRoot} onClick={onClick}>
      {children}
    </button>
  );
}
