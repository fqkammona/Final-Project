// TeamPage.js
import React from 'react';
import './TeamPage.css';
import fatimaImage from './TeamImages/test.png';
import sirenaImage from './TeamImages/Sirena.png';
import diegoImage from './TeamImages/Diego.png';
import MembersList from './Members';

// This should be the array you want to pass to MembersList
const membersData = [
  {
    name: 'Sirena Backham',
    title: 'Computer Science and Engineering',
    description: "Hello! I'm Sirena, a Computer Science and Engineering student at the University of Iowa, graduating in May 2024. I specialize in Big Data/Machine Learning and have a background in programming languages like Java, Python, and C++, as well as web technologies such as React and Django. Currently, I'm leading a senior project on an IoT-enhanced surveillance system. Check out my diverse projects on GitHub (sbackham). Thanks for reading!",
    image: sirenaImage,
  },
  {
    name: 'Diego Diaz',
    title: 'Electrical Engineering',
    description: "As a soon-to-be graduate in Electrical Engineering from the University of Iowa, I've dedicated my academic journey to mastering both my core discipline and its adjacent fields. I'm actively seeking roles where I can harness and further develop my skills. My aspiration is to make significant contributions to the ever-evolving tech arena, drawing from my distinct academic background.",
    image: diegoImage,
  },
  {
    name: 'Fatima Kammona',  
    title: 'Electrical Engineering & Computer Science and Engineering ',
    description: "As a final-year student at the University of Iowa, I am actively pursuing a dual degree in Electrical Engineering and Computer Science Engineering. With a dedicated focus on integrating these two disciplines, I am now seeking professional opportunities that will allow me to apply and expand my academic knowledge. My goal is to leverage my unique skill set to drive innovation and contribute to the evolving landscape of technology.",
    image: fatimaImage,
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
