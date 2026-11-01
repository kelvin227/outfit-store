"use client"
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginComp({ searchParams }: { searchParams: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

   const handleLogin = async() => {
    setLoading(true);
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (data.success) {
        alert("Login successful!");

        router.push(`/admin`);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-shell">
      <div className="login-panel">
        <p className="eyebrow">Private access</p>
        <h1>Store control</h1>
        <p className="login-copy">Manage your collection and keep availability up to date.</p>
        {searchParams && <p className="message error">That password is not correct.</p>}

        <form action={handleLogin} className="form">
                <label>
            Email
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} name="email" required autoFocus />
          </label>
          <label>
            Password
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" required autoFocus />
          </label>
          <button type="submit" className="button" disabled={loading}>{loading ? "Loading...":"Enter dashboard"} <span aria-hidden="true">→</span></button>
        </form>
      </div>
    </div>
  );
}
