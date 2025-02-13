"use client";
import { useState, useEffect } from "react";
import SpaceHopper from "./components/SpaceHopper";

const roles = [
  "a Software Engineer",
  "a Full Stack Developer",
  "an Entrepreneur",
];

export default function HomePage() {
  const [introText, setIntroText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [roleText, setRoleText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [navText, setNavText] = useState("");

  useEffect(() => {
    const text = "Hello, My name is Akon.";
    let i = 0;
    const interval = setInterval(() => {
      setIntroText(text.slice(0, i + 1));
      i++;
      if (i === text.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let timeout;
    const currentRole = roles[roleIndex];
    if (!isDeleting) {
      if (roleText.length < currentRole.length) {
        timeout = setTimeout(() => {
          setRoleText(currentRole.slice(0, roleText.length + 1));
        }, 50);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 1200);
      }
    } else {
      if (roleText.length > 0) {
        timeout = setTimeout(() => {
          setRoleText(currentRole.slice(0, roleText.length - 1));
        }, 50);
      } else {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [roleText, isDeleting]);

  useEffect(() => {
    const text =
      "Feel free to navigate through my portfolio, or become distracted with a fun game below:";
    let i = 0;
    const interval = setInterval(() => {
      setNavText(text.slice(0, i + 1));
      i++;
      if (i === text.length) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="h-screen flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
      <h1 className="text-4xl font-bold text-foreground h-20 sm:h-auto">
        {introText}
      </h1>
      <h2 className="text-2xl font-semibold text-primary mt-6 sm:mt-4">
        I am {roleText}
      </h2>
      <p className="mt-8 text-lg text-muted-foreground">
        {navText}
      </p>

      <SpaceHopper />
    </section>
  );
}
