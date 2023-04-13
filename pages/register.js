import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/form.module.css'
import Layout from '@/components/layout'
import { useState } from "react"
import { useRouter } from "next/router"

export default function Register() {
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const confirmPassword = e.target.confirmPassword.value;
    
        if (password !== confirmPassword) {
          setError("Passwords do not match");
          return;
        }
    
        const response = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });
    
        const result = await response.json();
    
        if (result.error) {
          setError(result.error);
        } else {
          router.push("/login");
        }
    };

    return (
        <>
        <Head>
            <title>remoteAI</title>
            <meta name="description" content="personalized remote AI jobs" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Layout>
            <div className={styles.register}>
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Name:</label>
                    <input type="text" name="name" id="name" required />

                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email" id="email" required />

                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" id="password" required />

                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input type="password" name="confirmPassword" id="confirmPassword" required />

                    <button type="submit">Register</button>
                </form>
            </div>
        </Layout>
        </>
    )
}
