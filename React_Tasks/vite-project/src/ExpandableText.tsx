import { useState } from 'react';

interface Props {
  children: string;
  maxChar?: number;
}

const ExpandableText = ({ children, maxChar }: Props) => {
  const [isExpanded, setExpanded] = useState(false);

  if (children.length < 15) return <p>{children}</p>;
  const text = children.substring(0, maxChar);
  return (
    <p>
      {isExpanded ? children : text}...
      <button
        onClick={() => {
          setExpanded(!isExpanded);
        }}
      >
        {isExpanded ? 'more' : 'less'}
      </button>
    </p>
  );
};

export default ExpandableText;
