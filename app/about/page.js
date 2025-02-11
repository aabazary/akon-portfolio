"use client";
import Image from "next/image";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import technologies from "@/public/data/technologies";
import credentials from "@/public/data/credentials";

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
            <p className="mt-4 text-lg leading-relaxed text-muted">
              Hi, I’m <span className="font-semibold">Ashkon "Akon" Abazary</span>, a <span className="font-semibold">Full Stack Web Developer</span> with a blend of analytical and creative skills.
              I hold a <span className="font-semibold">Bachelor's in Software Engineering</span> from Western Governors University and an <span className="font-semibold">Associate's in Biology</span> from Miramar College.
              <br /><br />
              My expertise lies in building <span className="font-semibold">scalable and dynamic web applications</span>. From mentoring students as a <span className="font-semibold">Teacher's Assistant at 2U</span> to running a successful business, my background combines leadership, problem-solving, and technical innovation.
              <br /><br />
              Looking forward to connecting and collaborating!
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

        {/* Credentials Section */}
        <div className="mt-12 bg-background shadow-lg rounded-2xl p-6 md:p-10">
          <h2 className="text-2xl font-bold text-foreground text-center">My Credentials</h2>
          <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
            {credentials.map((cred) => (
              <div key={cred.title} className="p-4 bg-muted rounded-lg shadow-lg">
                <Image src={cred.image} alt={cred.title} width={200} height={120} className="object-cover rounded-lg" />
                <p className="text-center text-sm font-semibold mt-2">{cred.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Technologies Section */}
        <div className="mt-12 bg-background shadow-lg rounded-2xl p-6 md:p-10">
          <h2 className="text-2xl font-bold text-foreground text-center">
            Technologies I Work With
          </h2>
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
