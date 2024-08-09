import React from 'react';

interface ContentCardProps {
 name: string;
 image: string;
 categories: string[];
 experts: { firstName: string; lastName: string; title: string; company: string }[];
}

const ContentCard: React.FC<ContentCardProps> = ({ name, image, categories, experts }) => {
 return (
  <div className="content-card">
   <img src={image} alt={name} />
   <h2>{name}</h2>
   <div className="categories">{categories.join(', ')}</div>
   <div className="experts">
    {experts.map((expert, index) => (
     <div key={index}>
      {expert.firstName} {expert.lastName}, {expert.title} at {expert.company}
     </div>
    ))}
   </div>
  </div>
 );
};

export default ContentCard;
