// TeamPage.js
import React from 'react';
import './TeamPage.css';
import test from './TeamImages/test.png';
import MembersList from './Members';

// This should be the array you want to pass to MembersList
const membersData = [
  {
    name: 'Fatima Kammona',  
    title: 'Role',
    description: "To combat the rise in texting-and-driving accidents, I created a lockbox for driver's phones that secures the device until the user's pre-selected destination is reached, using an LCD screen, RGB display, and button for input.",
    image: test,
  },
  {
    name: 'Sirena Backham',
    title: 'Project 2',
    description: "Hello! I am currently a CSE student at the University of Iowa with a focus in Big Data. My interests include full-stack development, AI tools, and IoT applications.",
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
      <div className="team-text">
        <h1>Our Team!</h1>
      </div>
      <MembersList members={membersData} />
    </div>
  );
};

export default TeamPage;
