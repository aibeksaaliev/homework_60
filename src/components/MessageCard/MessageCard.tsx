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
      <CardContent>
        <Typography>{author}</Typography>
        <Typography>{date.toString()}</Typography>
      </CardContent>
      <CardContent>
        <Typography>{message}</Typography>
      </CardContent>
    </Card>
  );
};

const compareProps = (prevProps: MessageCardProps, nextProps: MessageCardProps) => {
  return prevProps !== nextProps;
}

export default React.memo(MessageCard, compareProps);