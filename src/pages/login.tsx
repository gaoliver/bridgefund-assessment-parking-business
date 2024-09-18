import { Button, Card } from "@/components/atoms";
import { TextInput } from "@/components/molecules";
import styles from "@/styles/login.module.css";

export default function Login() {
  return (
    <main className={styles.main}>
      <Card>
        <h1>Login</h1>

        <div className={styles.fields}>
          <TextInput
            label="Email"
            name="email"
            type="email"
            placeholder="example@site.com"
          />
          <TextInput label="Password" name="password" type="password" />
        </div>

        <Button variant="primary">
          Login
        </Button>
      </Card>
    </main>
  );
}
