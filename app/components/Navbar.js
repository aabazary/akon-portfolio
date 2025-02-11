"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);

  const navItems = [
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="bg-background p-4 fixed w-full top-0 z-10 shadow-lg font-[Poppins, sans-serif]">
      <div className="container mx-auto flex justify-between items-center">
        {/* Portfolio Title as Home Link */}
        <Link href="/" className="text-foreground text-2xl font-bold hover:text-primary transition-colors">
          Akon
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6">
          {navItems.map(({ href, label }) => (
            <Link key={href} href={href} className="relative group text-lg font-medium text-foreground px-2">
              <span className="relative z-10">{label}</span>

              {/* Selected Page Indicator (Static Underline) */}
              {pathname === href && (
                <span className="absolute bottom-0 left-1/2 w-full h-1 bg-primary transform -translate-x-1/2"></span>
              )}

              {/* Hover Animation */}
              <span className="absolute bottom-0 left-1/2 w-0 h-1 bg-primary transition-all duration-300 ease-in-out group-hover:w-[calc(100%+8px)] group-hover:opacity-100 transform -translate-x-1/2"></span>

              {/* Vertical Expansion with Lighter Shade */}
              <span className="absolute bottom-0 left-1/2 w-0 h-0 rounded-t-lg bg-primary bg-opacity-30 transition-all duration-300 ease-in-out group-hover:w-[calc(100%+8px)] group-hover:h-full transform -translate-x-1/2 delay-200"></span>
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-foreground" onClick={toggleMenu}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 absolute w-full left-0 top-full">
          {navItems.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`block py-3 px-6 text-lg relative ${
                pathname === href ? "bg-primary text-white" : "text-gray-300 hover:bg-gray-700"
              }`}
              onClick={() => setIsOpen(false)}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
