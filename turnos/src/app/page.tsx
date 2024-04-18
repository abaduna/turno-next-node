"use client"

export default function Home() {
  const token = localStorage.getItem("token") ?? ""
  return (
    <>
    {token}
    </>
  );
}
