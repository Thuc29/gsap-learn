import Image from 'next/image'
import footerRight from '../assets/images/footer-right-leaf.png'
import footerLeft from '../assets/images/footer-left-leaf.png'
import facebookIcon from '../assets/images/fb.png'
import instagramIcon from '../assets/images/insta.png'
import xIcon from '../assets/images/x.png'
import { openingHours, socials } from '../constants'
import { useGSAP } from '@gsap/react'
import { SplitText } from 'gsap/all'
import gsap from 'gsap'

const Contact = () => {
     const socailIconList = [facebookIcon, instagramIcon, xIcon];

     useGSAP(() => {
          const titleSplit = SplitText.create('#content h2', { type: 'words' });
          const timeline = gsap.timeline({
               scrollTrigger: {
                    trigger: '#contact',
                    start: 'top center',
               },
               ease: 'power1.inOut',
          })
          timeline.from(titleSplit.words, { opacity: 0, yPercent: 100, stagger: 0.02 })
               .from('#contact h3, #contact p', { opacity: 0, yPercent: 100, stagger: 0.02 })
               .to('#f-right-leaf', { y: '-50', duration: 1, ease: 'power1.inOut' })
               .to('#f-left-leaf', { y: '-50', duration: 1, ease: 'power1.inOut' }, '<')
     }, [])
     return (
          <footer id='contact'>
               <Image src={footerRight} alt='leaf-right' id='f-right-leaf' sizes='400' />
               <Image src={footerLeft} alt='leaf-left' id='f-left-leaf' sizes='400' />

               <div className='content'>
                    <h2> Where to Find us</h2>
                    <div>
                         <h3>Visit Our Bar</h3>
                         <p>Nhon, Tay Tuu, Ha Noi, Viet Name  </p>
                    </div>
                    <div>
                         <h3>Contact Us</h3>
                         <p> 0123 456 789</p>
                         <p> hello@gmail.com</p>
                    </div>
                    <div>
                         <h3>Open Every Day</h3>
                         {openingHours.map((item, index) => (
                              <p key={index}>{item.day}: {item.time}</p>
                         ))}
                    </div>
                    <div>
                         <h3> Socials</h3>
                         <div className='flex-center gap-5'>
                              {socials.map((social, index) => (
                                   <a key={social.name}
                                        href={social.url}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        aria-label={social.name}>
                                        <Image src={socailIconList[index]} alt={`${social.name}-icon`} width={24} height={24} />
                                   </a>
                              ))}
                         </div>
                    </div>
               </div>

          </footer>
     )
}

export default Contact