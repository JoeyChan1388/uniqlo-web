import styles from "./badge.module.css";

// ------------------------------------------------------------------

interface BadgeProps {
  title: string;
}

// ------------------------------------------------------------------

function Badge({ title }: BadgeProps) {
  return (
    <div className={styles.badgeRoot}>
      <span className={styles.badgeContent}>{title}</span>
    </div>
  );
}

export default Badge;
