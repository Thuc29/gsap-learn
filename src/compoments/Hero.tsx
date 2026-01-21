"use client";

import Image from "next/image"
import heroLeft from '../assets/images/hero-left-leaf.png';
import heroRight from '../assets/images/hero-right-leaf.png';
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import gsap from "gsap";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";

const Hero = () => {
     const videoRef = useRef<HTMLVideoElement>(null);

     const isMobile = useMediaQuery({ maxWidth: 767 });
     useGSAP(() => {
          const heroSlit = new SplitText('.title', { type: 'chars, words' });
          const paragraphSlit = new SplitText('.subtitle', { type: 'lines' });

          heroSlit.chars.forEach((char) => char.classList.add('text-gradient'));

          gsap.from(heroSlit.chars, {
               yPercent: 100, // di chuyển từ dưới lên
               duration: 1,  // thời gian hoạt ảnh
               ease: 'expo.out', // hiệu ứng mượt mà
               stagger: 0.06, // thời gian giãn cách giữa các ký tự
          })

          gsap.from(paragraphSlit.lines, {
               opacity: 0,
               yPercent: 100,
               duration: 1.8,
               ease: 'expo.out',
               stagger: 0.06,
               delay: 1,
          });

          gsap.timeline({
               scrollTrigger: {
                    trigger: '#hero',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
               }
          })
               .to('.right-leaf', { y: 200 }, 0)
               .to('.left-leaf', { y: -200 }, 0)

          const startValue = isMobile ? 'top 50%' : 'center 60%'
          const endValue = isMobile ? '120% top' : 'bottom top'

          // Video animation
          const tl = gsap.timeline({
               scrollTrigger: {
                    trigger: 'video',
                    start: startValue,
                    end: endValue,
                    scrub: true,
                    pin: true,
               }
          })
          if (videoRef.current) {
               videoRef.current.onloadedmetadata = () => {
                    tl.to(videoRef.current, {
                         currentTime: videoRef.current?.duration,
                    });
               };
          }
     }, [isMobile]);

     return (
          <>
               <section id="hero" className="noisy">
                    <h1 className="title">PHELA</h1>
                    <Image src={heroLeft} alt="left-leaf" className="left-leaf" sizes='50' />
                    <Image src={heroRight} alt="right-leaf" className="right-leaf" sizes='50' />

                    <div className="body">
                         <div className="content">
                              <div className="space-y-5 hidden md:block">
                                   <p> Cool. Crisp. Classic.</p>
                                   <p className="subtitle"> Sip the Spirit <br />
                                        of Summer</p>
                              </div>

                              <div className="view-cocktails">
                                   <p className="subtitle">
                                        Every cocktail on our menu is a blend of premium ingredients, creative flair, and timeless recipes — designed to delight your senses.
                                   </p>
                                   <a href="#cocktails"> View Cocktails</a>
                              </div>
                         </div>
                    </div>
               </section>
               <div className="video absolute inset-0">
                    <video ref={videoRef} src="/videos/output.mp4" playsInline muted preload="auto" />
               </div>
          </>
     )
}

export default Hero