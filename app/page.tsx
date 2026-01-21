"use client";

import { ScrollTrigger, SplitText } from "gsap/all";
import gsap from "gsap";
import "./globals.css";
import Navbar from "../src/compoments/Navbar";
import Hero from "../src/compoments/Hero";
import Coocktails from "../src/compoments/Coocktails";
import About from "../src/compoments/About";
import Art from "../src/compoments/Art";
import Menu from "../src/compoments/Menu";
import Contact from "../src/compoments/Contact";

gsap.registerPlugin(ScrollTrigger, SplitText);
export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Coocktails />
      <About />
      <Art />
      <Menu />
      <Contact />
    </main>
  );
}
