import Link from "next/link";
import styles from "./iconButton.module.css";

// ------------------------------------------------------------------

interface IconButtonProps {
  onClick?: () => void;
  href?: string;
  children: React.ReactNode;
}

// ------------------------------------------------------------------

export default function IconButton({
  onClick,
  href,
  children,
}: IconButtonProps) {
  if (href) {
    return (
      <Link className={styles.iconButtonRoot} href={href} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button className={styles.iconButtonRoot} onClick={onClick}>
      {children}
    </button>
  );
}
