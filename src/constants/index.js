import { nova, waterkeeper, clothesline, cc } from "../assets/images";
import {
    car,
    contact,
    css,
    estate,
    express,
    git,
    github,
    html,
    javascript,
    linkedin,
    mongodb,
    motion,
    mui,
    nextjs,
    nodejs,
    pricewise,
    react,
    redux,
    sass,
    snapgram,
    summiz,
    tailwindcss,
    threads,
    typescript
} from "../assets/icons";

export const skills = [
    {
        imageUrl: css,
        name: "CSS",
        type: "Frontend",
    },
    {
        imageUrl: express,
        name: "Express",
        type: "Backend",
    },
    {
        imageUrl: git,
        name: "Git",
        type: "Version Control",
    },
    {
        imageUrl: github,
        name: "GitHub",
        type: "Version Control",
    },
    {
        imageUrl: html,
        name: "HTML",
        type: "Frontend",
    },
    {
        imageUrl: javascript,
        name: "JavaScript",
        type: "Frontend",
    },
    {
        imageUrl: mongodb,
        name: "MongoDB",
        type: "Database",
    },
    {
        imageUrl: motion,
        name: "Motion",
        type: "Animation",
    },
    {
        imageUrl: mui,
        name: "Material-UI",
        type: "Frontend",
    },
    {
        imageUrl: nextjs,
        name: "Next.js",
        type: "Frontend",
    },
    {
        imageUrl: nodejs,
        name: "Node.js",
        type: "Backend",
    },
    {
        imageUrl: react,
        name: "React",
        type: "Frontend",
    },
    {
        imageUrl: redux,
        name: "Redux",
        type: "State Management",
    },
    {
        imageUrl: sass,
        name: "Sass",
        type: "Frontend",
    },
    {
        imageUrl: tailwindcss,
        name: "Tailwind CSS",
        type: "Frontend",
    },
    {
        imageUrl: typescript,
        name: "TypeScript",
        type: "Frontend",
    }
];

export const experiences = [
    {
        title: "Research Assistant",
        company_name: "Di Carlo Lab @ UCLA",
        icon: car,
        iconBg: "#a2d2ff",
        date: "April 2025 - Present",
        points: [
            "Designing and deploying a lab website + chatbot to enhance lab visibility and accessibility.",
            "Engineering a memory-enabled LLM assistant to support research workflows and improve lab efficiency.",
        ],
    },
    {
        title: "Project Lead & Developer",
        company_name: "Nova, Tech for Good",
        icon: nova,
        iconBg: "#b7e4c7",
        date: "Sept. 2024 - Present",
        points: [
            "Leading a team for 'Save Cantonese' project to preserve and promote Cantonese language and culture.",
            "Partnering with LA Waterkeeper to develop technology solutions for environmental causes.",
            "Contributing to 'Rate My Plate' project to improve food accessibility and nutrition awareness.",
        ],
    },
    {
        title: "Academic Mentor",
        company_name: "Curious Cardinals",
        icon: cc,
        iconBg: "#accbe1",
        date: "Sept. 2025 - Present",
        points: [
            "Mentoring students in computer science and mathematics to enhance their academic performance.",
            "Guiding students on STEM pathways and career development opportunities.",
        ],
    },
    {
        title: "Research Intern",
        company_name: "Air Quality Modeling and Exposure Lab @ UC Berkeley",
        iconBg: "#fbc3bc",
        icon: tailwindcss,
        date: "Aug. 2023 - Sept. 2024",
        points: [
            "Coordinating Clarity node installation to expand air quality monitoring network coverage.",
            "Programming regression models to analyze air quality data and predict environmental patterns.",
        ],
    },
];

export const socialLinks = [
    {
        name: 'Contact',
        iconUrl: contact,
        link: '/contact',
    },
    {
        name: 'GitHub',
        iconUrl: github,
        link: 'https://github.com/YourGitHubUsername',
    },
    {
        name: 'LinkedIn',
        iconUrl: linkedin,
        link: 'https://www.linkedin.com/in/YourLinkedInUsername',
    }
];

export const projects = [
    {
        iconUrl: clothesline,
        theme: 'btn-back-pink',
        name: 'Clothesline UCLA',
        description: 'Built an iOS app using Flutter for a campus clothing exchange platform. Implemented custom components and successfully deployed to the iOS App Store, serving as Frontend Developer & Licensing Lead.',
        link: 'https://github.com',
    },
    {
        iconUrl: waterkeeper,
        theme: 'btn-back-green',
        name: 'LA Waterkeeper',
        description: 'Partnered with NPO LA Waterkeeper to build a fully scrollable informational site to educate the public on the LA River. Used Next.js, TypeScript, and Tailwind CSS to develop responsive, accessible frontend pages.',
        link: 'https://github.com',
    },
    {
        iconUrl: summiz,
        theme: 'btn-back-yellow',
        name: 'Agewell Bruins',
        description: 'Building a geriatric virtual assistant to help senior citizens complete daily tasks using Python, Flask, and Firebase. Implementing a conversational memory system with LangChain and ChromaDB to retain context across multiple mic interactions.',
        link: 'https://github.com',
    },
    {
        iconUrl: estate,
        theme: 'btn-back-black',
        name: 'Koshalya',
        description: 'Built a React + Firebase app for a Kathak dance academy of 50+ students to streamline attendance and fee tracking. Automated monthly calculations, reducing payment tracking errors by 80% and saving several hours of manual work each month.',
        link: 'https://github.com',
    }
];
