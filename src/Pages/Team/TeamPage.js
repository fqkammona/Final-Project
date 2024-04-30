// TeamPage.js
import React from 'react';
import './TeamPage.css';
import test from './TeamImages/test.png';
import sirenaImage from './TeamImages/Sirena.png';
import MembersList from './Members';

// This should be the array you want to pass to MembersList
const membersData = [
  {
    name: 'Sirena Backham',
    title: 'Computer Science and Engineering',
    description: "Hello! I'm Sirena, a Computer Science and Engineering (CSE) student at the University of Iowa, with a focus area in Big Data/Machine Learning and set to graduate in May 2024. My technical experience spans a broad range of programming languages including Java, Python, C++, and web technologies such as React, Node.js, and Django. I am interested in utilizing machine learning frameworks like PyTorch and TensorFlow to solve real-world problems. Currently, I'm leading the development of an IoT-enhanced surveillance system for my senior capstone project, which integrates real-time recognition and machine learning algorithms for enhanced security monitoring. My GitHub portfolio (sbackham) showcases a range of projects from AI-assisted music generation applications to advanced web-enabled IoT systems, showing my passion for continuous learning and application of broad technologies. See those below in my projects section. Thanks for reading!",
    image: sirenaImage,
  },
  {
    name: 'Fatima Kammona',  
    title: 'Role',
    description: "To combat the rise in texting-and-driving accidents, I created a lockbox for driver's phones that secures the device until the user's pre-selected destination is reached, using an LCD screen, RGB display, and button for input.",
    image: test,
  },
  {
    name: 'Diego Diaz',
    title: 'Project 3',
    description: "As a soon-to-be graduate in Electrical Engineering from the University of Iowa, I've dedicated my academic journey to mastering both my core discipline and its adjacent fields. I'''m actively seeking roles where I can harness and further develop my skills. My aspiration is to make significant contributions to the ever-evolving tech arena, drawing from my distinct academic background.",
    image: test,
  },
];

const TeamPage = () => {
  return (
    <div className="team-page">
      <div className="team-text">Our Team</div>
      <div className="team-form">
      <MembersList members={membersData} />
      </div>
    </div>
  );
};

export default TeamPage;
