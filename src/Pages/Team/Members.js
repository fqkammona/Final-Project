// MemberCard.js
import React from 'react';
import './Members.css';

const MemberCard = ({ name, title, image, description }) => (
  <div className="member-card">
    <div className="member-inner">
      {/* Front of the card */}
      <div className="member-front">
      <img src={image} alt={name} className="member-image" />
        <div className="member-info">
          <div className="member-name">{name}</div>
          <div className="member-title">{title}</div>
        </div>
      </div>
      {/* Back of the card */}
      <div className="member-back">
        <div className="member-info-back">
          <div className="member-name-back">{name}</div>
          <div className="member-title-back">{title}</div>
          <div className="member-description">{description}</div>
        </div>
      </div>
    </div>
  </div>
);

// MemberCard.js



const MembersList = ({ members }) => (
  <div className="members-container">
    {members.map(member => (
      <MemberCard key={member.title} {...member} />
    ))}
  </div>
);

export default MembersList;
