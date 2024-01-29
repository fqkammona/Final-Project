// TeamPage.js
import React from 'react';
import './TeamPage.css';
import fatima from './TeamImages/test.jpg';
import MembersList from './Members';

// This should be the array you want to pass to MembersList
const membersData = [
  {
    name: 'Fatima Kammona', 
    title: 'Role',
    description: "To combat the rise in texting-and-driving accidents, I created a lockbox for driver's phones that secures the device until the user's pre-selected destination is reached, using an LCD screen, RGB display, and button for input.",
    image: fatima,
  },
  {
    name: 'Sirena Backham',
    title: 'Project 2',
    description: 'This is project 2 description.',
    image: 'https://via.placeholder.com/150',
  },
  {
    name: 'Diego Diaz',
    title: 'Project 3',
    description: 'This is project 3 description.',
    image: 'https://via.placeholder.com/150',
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
