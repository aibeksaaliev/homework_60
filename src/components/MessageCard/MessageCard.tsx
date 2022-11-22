import React from 'react';

interface MessageCardProps {
  author: string;
  date: Date;
  message: string;
}

const MessageCard: React.FC<MessageCardProps> = ({author, date, message}) => {
  return (
    <div>
      <div>
        <span>{author}</span>
        <span>{date.toString()}</span>
      </div>
      <div>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default MessageCard;