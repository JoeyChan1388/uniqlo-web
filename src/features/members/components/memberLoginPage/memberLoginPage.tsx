import styles from "./memberLoginPage.module.css";

import LoginForm from "@/features/members/components/loginForm/loginForm";

// ------------------------------------------------------------------

export default function MemberLoginPage() {
  return (
    <div className={styles.container}>
      <h1>Sign in</h1>

      <LoginForm />
    </div>
  );
}
