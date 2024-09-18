import { Card } from "@/components/atoms";
import styles from "@/styles/login.module.css";

export default function Login() {
  return (
    <main className={styles.main}>
      <Card>
        <h1>Login</h1>

        <div className={styles.fields}>email; password;</div>

        <div className={styles.ctas}>login button</div>
      </Card>
    </main>
  );
}
