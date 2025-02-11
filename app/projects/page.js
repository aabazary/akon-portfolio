"use client";
import { FaGithub, FaExternalLinkAlt, FaDownload } from "react-icons/fa";
import projects from "@/public/data/projects";

export default function Projects() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 py-6">
      <div className="max-w-5xl w-full">
        <h1 className="text-3xl font-bold text-foreground text-center mb-4">
          Projects
        </h1>
        {/* <div className="flex justify-between items-center bg-muted p-3">{project.title}<div/> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="relative bg-background shadow-lg rounded-2xl overflow-hidden group">
                
                <div  className="flex justify-center items-center bg-muted p-3 font-bold">{project.title}</div>
              {/* Project Image */}
              <div className="relative">
                <img
                  src={project.img}
                  alt={project.title}
                  className="w-full h-48 object-cover transition-opacity duration-300 group-hover:opacity-40"
                />

                {/* Hover Description */}
                <div className="absolute inset-0 flex items-center justify-center text-center px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-foreground font-semibold">{project.desc}</p>
                </div>
              </div>

              {/* Buttons & Technology Icons Container */}
              <div className="flex justify-between items-center bg-muted p-3">
                {/* Buttons */}
                <div className="flex gap-3">
                  {project.github_link && (
                    <a
                      href={project.github_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground hover:text-primary transition text-xl"
                    >
                      <FaGithub />
                    </a>
                  )}
                  {project.live_link && (
                    <a
                      href={project.live_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground hover:text-primary transition text-xl"
                    >
                      <FaExternalLinkAlt />
                    </a>
                  )}
                  {project.download && (
                    <a
                      href={project.download}
                      download
                      className="text-foreground hover:text-primary transition text-xl"
                    >
                      <FaDownload />
                    </a>
                  )}
                </div>

                {/* Technology Icons */}
                <div className="flex gap-2">
                  {project.technologies.map((tech, index) => (
                    <img key={index} src={tech} alt="Tech" className="w-6 h-6" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
