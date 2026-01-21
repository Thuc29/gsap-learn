import React from 'react'
import cocktailLeft from '../assets/images/cocktail-left-leaf.png'
import cocktailRight from '../assets/images/cocktail-right-leaf.png'
import Image from 'next/image'
import { cocktailLists, mockTailLists } from '../constants'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const Coocktails = () => {
     useGSAP(() => {
          const parallaxTimeline = gsap.timeline({
               scrollTrigger: {
                    trigger: '#cocktails',
                    start: 'top 30%',
                    end: 'bottom 80%',
                    scrub: true,
               }
          })
          parallaxTimeline
               .to('#c-left-leaf', { x: -100, y: 100 })
               .to('#c-right-leaf', { x: 100, y: 100 })
     }, [])
     return (
          <section id="cocktails" className="noisy">
               <Image src={cocktailLeft} alt="l-leaf" id="c-left-leaf" sizes='100' />
               <Image src={cocktailRight} alt="r-leaf" id="c-right-leaf" sizes='300' />

               <div className="list">
                    <div className="popular">
                         <h2> Most popular coktails: </h2>

                         <ul>
                              {cocktailLists.map(({ name, country, detail, price }) => (
                                   <li key={name}>
                                        <div className="me-8">
                                             <h3>{name}</h3>
                                             <p>{country} | {detail}</p>
                                        </div>
                                        <span> - {price}</span>
                                   </li>
                              ))}
                         </ul>
                    </div>
                    <div className="loved">
                         <h2> Most loved mocktails: </h2>

                         <ul>
                              {mockTailLists.map(({ name, country, detail, price }) => (
                                   <li key={name}>
                                        <div className="me-8">
                                             <h3>{name}</h3>
                                             <p>{country} | {detail}</p>
                                        </div>
                                        <span> - {price}</span>
                                   </li>
                              ))}
                         </ul>
                    </div>
               </div>
          </section>

     )
}

export default Coocktails