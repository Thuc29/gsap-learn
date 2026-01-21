"use client"
import Image from 'next/image'
import sliderLeft from '../assets/images/slider-left-leaf.png'
import sliderRight from '../assets/images/slider-right-leaf.png'
import rightArrow from '../assets/images/right-arrow.png'
import leftArrow from '../assets/images/left-arrow.png'
import drink1 from '../assets/images/drink1.png'
import drink2 from '../assets/images/drink2.png'
import drink3 from '../assets/images/drink3.png'
import drink4 from '../assets/images/drink4.png'
import { allCocktails } from '../constants'
import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const Menu = () => {
     const contentRef = useRef<HTMLDivElement>(null);
     const [currentIndex, setCurrentIndex] = useState(0)
     const goToSlide = (index: number) => {
          const newIndex = (index + allCocktails.length) % allCocktails.length
          setCurrentIndex(newIndex)
     }

     const getCocktailAt = (indexOfset: number) => {
          return allCocktails[(currentIndex + indexOfset + allCocktails.length) % allCocktails.length]
     }

     const currentCocktail = getCocktailAt(0)
     const prevCocktail = getCocktailAt(-1)
     const nextCocktail = getCocktailAt(+1)
     const images = [drink1, drink2, drink3, drink4]

     useGSAP(() => {
          gsap.fromTo('#title', { opacity: 0 }, { opacity: 1, duration: 1 })
          gsap.fromTo('.cocktail img', { opacity: 0, xPercent: -100 }, {
               xPercent: 0, opacity: 1, duration: 1, ease: 'power1.inOut',
          })
          gsap.fromTo('.details h2', { opacity: 0, yPercent: 100 }, {
               yPercent: 0, opacity: 100, ease: 'power1.inOut',
          })
          gsap.fromTo('.details p', { opacity: 0, yPercent: 100 }, {
               yPercent: 0, opacity: 100, ease: 'power1.inOut',
          })

     }, [currentIndex])
     return (
          <section id='menu' aria-labelledby='menu-heading'>
               <Image src={sliderLeft} alt='left-leaf' id='m-left-leaf' sizes='400' />
               <Image src={sliderRight} alt='right-leaf' id='m-right-leaf' sizes='400' />

               <h2 id='menu-heading' className='sr-only'>
                    Cocktail menu
               </h2>
               <nav className='cocktail-tabs' aria-label='Cocktail Navigation'>
                    {allCocktails.map((cocktail, index) => {
                         const isActive = index === currentIndex;
                         return (
                              <button
                                   key={cocktail.id}
                                   className={`${isActive ? 'text-white border-white' : 'text-white/50 border-white/50'}`}
                                   onClick={() => goToSlide(index)}
                              >
                                   {cocktail.name}
                              </button>
                         )
                    })}
               </nav>

               <div className='content'>
                    <div className='arrows'>
                         <button className='text-left' onClick={() => goToSlide(currentIndex - 1)} aria-label='Previous Cocktail'>
                              <span> {prevCocktail.name}</span>
                              <Image src={rightArrow} alt='right-arrow' aria-hidden='true' />
                         </button>
                         <button className='text-left' onClick={() => goToSlide(currentIndex + 1)} aria-label='Previous Cocktail'>
                              <span> {nextCocktail.name}</span>
                              <Image src={leftArrow} alt='left-arrow' aria-hidden='true' />
                         </button>
                    </div>
                    <div className='cocktail'>
                         <Image
                              src={images[currentIndex]}
                              alt={currentCocktail.name}
                              className="object-contain"
                              priority
                         />
                    </div>
                    <div className='recipe'>
                         <div ref={contentRef} className='info'>
                              <p>Recipe for:</p>
                              <p id='title'> {currentCocktail.name}</p>
                         </div>

                         <div className='details'>
                              <h2> {currentCocktail.title}</h2>
                              <p>{currentCocktail.description}</p>
                         </div>
                    </div>
               </div>


          </section>
     )
}

export default Menu