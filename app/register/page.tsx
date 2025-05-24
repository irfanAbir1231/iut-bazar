// pages/login.js
"use client";
import React, { CSSProperties } from "react";
import Head from "next/head";

export default function Login() {
  const googleLogin = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  return (
    <>
      <Head>
        <title>Google OAuth Test</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div style={styles.container}>
        <h1>Login with Google</h1>
        <button onClick={googleLogin} style={styles.button}>
          Sign in with Google
        </button>
      </div>
    </>
  );
}

const styles: { [key: string]: CSSProperties } = {
  container: {
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
    marginTop: "50px",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#4285f4",
    color: "white",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
  },
};
