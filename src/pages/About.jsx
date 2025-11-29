import React from 'react'
import { skills, experiences } from '../constants'
import CTA from '../components/CTA'

const About = () => {
  return (
    <section className="max-container">
      <h1 className="head-text">
        Hello! I'm <span className="blue-gradient_text font-semibold drop-shadow">Anusha</span>
      </h1>

      <div className="mt-5 flex flex-col gap-3 text-slate-500">
        <p>2nd-year Computer Science student at UCLA, passionate 
          about building web applications and exploring new technologies.</p>
      </div>

      <div className="py-10 flex flex-col">
        <h3 className="subhead-text">My Skills</h3>

        <div className="mt-16 flex flex-wrap gap-12">
          {skills.map((skill) => (
            <div key={skill.name} className="block-container w-20 h-20">
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

        <div className="mt-12">
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500"></div>
            
            <div className="space-y-12">
              {experiences.map((experience, index) => (
                <div key={index} className="relative pl-24">
                  <div 
                    className="absolute left-0 top-0 w-16 h-16 rounded-full flex items-center justify-center shadow-lg border-4 border-white"
                    style={{ backgroundColor: experience.iconBg }}
                  >
                    <img
                      src={experience.icon}
                      alt={experience.company_name}
                      className="w-10 h-10 object-contain"
                    />
                  </div>
                  
                  <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">
                          {experience.title}
                        </h3>
                        <p className="text-base font-medium text-gray-600 mt-1">
                          {experience.company_name}
                        </p>
                      </div>
                      <p className="text-sm font-medium text-blue-600 mt-2 sm:mt-0">
                        {experience.date}
                      </p>
                    </div>
                    
                    <ul className="mt-4 space-y-2">
                      {experience.points.map((point, pointIndex) => (
                        <li key={pointIndex} className="text-gray-600 text-sm flex items-start">
                          <span className="text-blue-500 mr-2">▹</span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <hr className="border-slate-200"/>

      <CTA>

      </CTA>
    </section>
  )
}

export default About