import React from 'react'
import { Link } from 'react-router-dom'
import {arrow} from '../assets/icons'

const InfoBox = ({ text, link, btnText}) => (
    <div className="info-box">
        <p className="font-medium sm:text-x1 text-center">{text}</p>
        <Link to={link} className="neo-brutalism-white neo-btn">
            {btnText}
            <img src={arrow} className="w-4 h-4 object-contain"/>
        </Link>
    </div>
)

const renderContent = {
    1: (
        <h1 className="sm:text-xl sm:leading-snug text-center neo-brutalism-blue py-4 px-8 text-white mx-5">
            Hi, I'm <span className="font-semibold">Anusha Ladha</span> 💫
            <br />
            A 2nd-year Computer Science student at UCLA 🧸
        </h1>
    ),
    2: (
        <InfoBox 
            text="Step into my world and the things that motivate my work."
            link="/about"
            btnText="About Me"
        />
    ), 
    3: (
        <InfoBox 
            text="Take a look at the projects I've built across web and mobile platforms."
            link="/projects"
            btnText="View Projects"
        />
    ),
    4: (
        <InfoBox 
            text="Whether you want to collaborate, connect, or just say hi, my inbox is always open!"
            link="/contact"
            btnText="Get In Touch"
        />
    ),
}

const HomeInfo = ({ currentStage }) => {
  return renderContent[currentStage] || null;
}

export default HomeInfo