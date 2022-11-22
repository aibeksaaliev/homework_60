import React from 'react';
import {Card} from "@mui/material";
import {CardContent} from "@mui/material";
import {Typography} from "@mui/material";

interface MessageCardProps {
  author: string;
  date: Date;
  message: string;
}

const MessageCard: React.FC<MessageCardProps> = ({author, date, message}) => {
  return (
    <Card sx={{mb: 2}}>
      <CardContent sx={{display: "flex", justifyContent: "space-between"}}>
        <Typography>Date: {date.toString().slice(0, 10)} {date.toString().slice(11, 19)}</Typography>
        <Typography>Author: {author}</Typography>
      </CardContent>
      <CardContent sx={{background: "white", opacity: "0.3", color: "black"}}>
        <Typography sx={{textAlign: "right"}}>{message}</Typography>
      </CardContent>
    </Card>
  );
};

const compareProps = (prevProps: MessageCardProps, nextProps: MessageCardProps) => {
  return prevProps !== nextProps;
}

export default React.memo(MessageCard, compareProps);