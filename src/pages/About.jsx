import React from 'react'
import { skills } from '../constants'

const About = () => {
  return (
    <section className="max-container">
      <h1 className="head-text">
        Hello! I'm <span className="blue-gradient_text 
        font-semibold drop-shadow">Anusha</span>
      </h1>

      <div className="mt-5 flex flex-col gap-3 text-slate-500">
        <p>2nd-year Computer Science student at UCLA, passionate 
          about building web applications and exploring new technologies.</p>
      </div>

      <div className="py-10 flex flex-col">
        <h3 className="subhead-text">My Skills</h3>

        <div className="mt-16 flex flex-wrap gap-12">
          {skills.map((skill) => (
            <div className="block-container w-20 h-20">
              <div className="btn-back rounded-xl"/>
              <div className="btn-front rounded-xl flex justify-center items-center">
                <img 
                  src={skill.imageUrl}
                  alt={skill.name}
                  className="w-1/2 h-1/2 object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="py-16">
        <h3 className="subhead-text">Work Experience</h3>

        <div className="mt-5 flex flex-col gap-3 text-slate-500">
          <p>I've worked with all sorts of people, leveling up my skills and teaming up
            with smart people. Here's the rundown:
          </p>
        </div>

        <div className="mt-12 flex">
          
        </div>
      </div>
    </section>
  )
}

export default About