import React, {useEffect, useState} from 'react';
import MessageForm from "../../components/MessageForm/MessageForm";
import {MessageType} from "../../type";
import MessageCard from "../../components/MessageCard/MessageCard";

const FreeChat = () => {
  const url: string = "http://146.185.154.90:8000/messages";

  const [messages, setMessages] = useState<MessageType []>([]);

  useEffect(() => {
    let lastDate: string = "";
    console.log(lastDate);
    const getMessages = async () => {
      const response = await fetch(url);
      const messagesFromApi: MessageType [] = await response.json();
      lastDate = messagesFromApi[messagesFromApi.length -1].datetime.toString();
      setMessages(prevState => ([...prevState, ...messagesFromApi]));
    }

    getMessages().catch(console.error)

    setInterval(async () => {
        const response = await fetch(url + "?datetime=" + lastDate);
        const lastMessages: MessageType [] = await response.json();
        if (lastMessages.length !== 0) {
          lastDate = lastMessages[lastMessages.length - 1].datetime.toString();
          setMessages(prevState => ([...prevState, ...lastMessages]));
        }
    }, 10000)


  }, []);



  return (
    <>
      <MessageForm/>
      {messages.map(message => {
        return <MessageCard
          author={message.author}
          date={message.datetime}
          message={message.message}
          key={message._id}
        />
      })}
    </>
  );
};

export default FreeChat;