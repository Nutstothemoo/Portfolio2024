'use client'
import Image from 'next/image'
import styles from './style.module.scss'
import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { slideUp } from './animation';
import { motion } from 'framer-motion';


export default function Home() {

  const firstText = useRef(null);
  const secondText = useRef(null);
  const slider = useRef(null);
  let xPercent = 0;
  let direction = -1;

  useLayoutEffect( () => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(slider.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        scrub: 0.25,
        start: 0,
        end: window.innerHeight,
        onUpdate: e => direction = e.direction * -1
      },
      x: "-500px",
    })
    requestAnimationFrame(animate);
  }, [])

  const animate = () => {
    if(xPercent < -100){
      xPercent = 0;
    }
    else if(xPercent > 0){
      xPercent = -100;
    }
    gsap.set(firstText.current, {xPercent: xPercent})
    gsap.set(secondText.current, {xPercent: xPercent})
    requestAnimationFrame(animate);
    xPercent += 0.1 * direction;
  }

  return (
    <motion.main variants={slideUp} initial="initial" animate="enter" className={styles.landing}>
      <Image 
        width="300"
        height={
          300
        }
        src="https://cdn.sanity.io/images/2kxk5fim/production/789602de63d707417e94a6b32ed69b8d1fb55bb5-1739x1739.png"
        alt="logo"
      />
      <div className={styles.sliderContainer}>
        <div ref={slider} className={styles.slider}>
          <p ref={firstText}>M</p>
          <p ref={secondText}>D</p>
        </div>
      </div>
      <div data-scroll data-scroll-speed={0.6} className={styles.description}>
        <p>FullStack</p>
        <p>Developer</p>
      </div>
    </motion.main>
  )
}
