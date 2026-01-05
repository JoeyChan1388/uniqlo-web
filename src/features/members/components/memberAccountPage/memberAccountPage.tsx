"use client";

import { useCurrentMember } from "@/stores/MemberStore";
import styles from "./memberAccountPage.module.css";

// ------------------------------------------------------------------

export default function MemberAccountPage() {
  const { currentMember } = useCurrentMember();

  return (
    <div className={styles.container}>
      <h1>Welcome, {currentMember?.name}!</h1>
      <p>Email: {currentMember?.email}</p>
      <p>Member Type: {currentMember?.type}</p>
    </div>
  );
}
