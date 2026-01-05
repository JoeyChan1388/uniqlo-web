import styles from "./memberSignupPage.module.css";

import SignupForm from "@/features/members/components/signupForm/signupForm";

// ------------------------------------------------------------------

export default function MemberSignupPage() {
  return (
    <div>
      <h1>Create Account</h1>

      <SignupForm />
    </div>
  );
}
