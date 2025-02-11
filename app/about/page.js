"use client";
import Image from "next/image";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import technologies from "@/public/data/technologies"; 

export default function About() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <div className="max-w-5xl w-full">
        {/* About Section */}
        <div className="bg-background shadow-lg rounded-2xl p-6 md:p-10 flex flex-col md:flex-row items-center gap-8">
          {/* Profile Image */}
          <div className="w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden border-4 border-primary">
            <Image src="/akon.jpg" alt="Akon" width={208} height={208} className="object-cover w-full h-full" />
          </div>

          {/* Text Section */}
          <div className="text-center md:text-left flex-1">
            <h1 className="text-3xl font-bold text-foreground">About Me</h1>
            <p className="mt-4 text-muted">
              I'm a passionate full-stack developer with experience in building scalable web applications.
              I love working with modern technologies to create engaging user experiences.
            </p>

            {/* Links & Resume */}
            <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-4">
              <a href="/resume.pdf" download className="px-6 py-2 rounded-lg bg-primary text-white font-semibold hover:opacity-80 transition">
                Download Resume
              </a>
              <a href="https://github.com/aabazary" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition text-2xl">
                <FaGithub />
              </a>
              <a href="https://www.linkedin.com/in/ashkon-abazary-19b099213/" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition text-2xl">
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>

        {/* Technologies Section */}
        <div className="mt-12 bg-background shadow-lg rounded-2xl p-6 md:p-10">
          <h2 className="text-2xl font-bold text-foreground text-center">Technologies I Work With</h2>
          <div className="mt-6 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6 justify-items-center">
            {technologies.map((tech) => (
              <div key={tech.name} className="flex flex-col items-center">
                <img src={tech.icon} alt={tech.name} className="w-12 h-12" />
                <span className="text-sm text-muted">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
