import React, {FormEvent, useState} from 'react';
import {PostMessageType} from "../../type";
import {Button} from "@mui/material";
import {TextField} from "@mui/material";


const MessageForm = () => {
  const [message, setMessage] = useState<PostMessageType>({
    message: "",
    author: ""
  });

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setMessage(prevState => ({...prevState, [name]: value}));
  }

  const sendMessage = async (e: FormEvent) => {
    e.preventDefault();
    const url: string = "http://146.185.154.90:8000/messages";
    const data = new URLSearchParams();
    data.set('message', message.message);
    data.set('author', message.author);

    try {
      const response = await fetch(url, {
        method: 'post',
        body: data,
      });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <form
      onSubmit={(e) => sendMessage(e)}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Author name"
        autoComplete="Author name"
        autoFocus
        type="text"
        placeholder="Your name"
        name="author"
        onChange={onInputChange}
        value={message?.author}/>
      <TextField
        margin="normal"
        required
        fullWidth
        id="message"
        label="Message"
        autoComplete="message"
        autoFocus
        type="text"
        placeholder="Type a message"
        name="message"
        onChange={onInputChange}
        value={message?.message}/>
      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        type="submit">Send</Button>
    </form>
  );
};

export default MessageForm;