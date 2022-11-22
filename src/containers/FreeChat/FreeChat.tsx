import React, {useEffect, useState} from 'react';
import MessageForm from "../../components/MessageForm/MessageForm";
import {MessageType} from "../../type";
import MessageCard from "../../components/MessageCard/MessageCard";
import {Container} from "@mui/material";
import {Paper} from "@mui/material";
import {List} from "@mui/material";
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  hideScroll: {
    '&::-webkit-scrollbar': {
      display: "none"
    },
  },
});

const FreeChat = () => {
  const url: string = "http://146.185.154.90:8000/messages";

  const [messages, setMessages] = useState<MessageType []>([]);

  useEffect(() => {
    let lastDate: Date;
    const getMessages = async () => {
      const response = await fetch(url);
      const messagesFromApi: MessageType [] = await response.json();
      lastDate = messagesFromApi[messagesFromApi.length - 1].datetime;
      setMessages(prevState => ([...prevState, ...messagesFromApi]));
    }

    getMessages().catch(console.error)

    setInterval(async () => {
      try {
        const response = await fetch(url + "?datetime=" + lastDate);
        const lastMessages: MessageType [] = await response.json();
        if (lastMessages.length) {
          lastDate = lastMessages[lastMessages.length - 1].datetime;
          setMessages(prevState => ([...prevState, ...lastMessages]));
        }
      } catch (e) {
        console.log("Error: ", e);
      }
    }, 3000)


  }, []);

  const classes = useStyles();

  return (
    <Container>
      <MessageForm/>
      <Paper
        elevation={3}
        sx={{maxHeight: 500, overflow: 'auto'}}
        className={classes.hideScroll}
      >
        <List
          style={{display: "flex", flexDirection: "column-reverse"}}>
          {messages.map(message => {
            return <MessageCard
              author={message.author}
              date={message.datetime}
              message={message.message}
              key={message._id}
            />
          })}
        </List>
      </Paper>

    </Container>
  );
};

export default FreeChat;