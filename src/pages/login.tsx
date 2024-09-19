import { Button, Card } from "@/components/atoms";
import { TextInput } from "@/components/molecules";
import styles from "@/styles/login.module.css";
import { LoginWithPasswordDto } from "@/types/api";
import { encrypt } from "@/utils/encrypt";
import { useFormik } from "formik";
import { signIn } from "next-auth/react";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export default function Login() {
  const { handleChange, values, handleSubmit, errors } =
    useFormik<LoginWithPasswordDto>({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: schema,
      validateOnChange: false,
      onSubmit: async (values) => {
        await signIn("credentials", {
          email: values.email,
          password: encrypt(values.password),
          callbackUrl: "/dashboard",
        });
      },
    });

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
            value={values.email}
            onChange={handleChange}
          />
          <TextInput
            label="Password"
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
          />
        </div>

        <Button variant="primary" type="submit" onClick={() => handleSubmit()}>
          Login
        </Button>
      </Card>
    </main>
  );
}
