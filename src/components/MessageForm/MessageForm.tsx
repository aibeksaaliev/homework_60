import React, {FormEvent, useState} from 'react';
import {PostMessageType} from "../../type";
import {Button} from "@mui/material";
import {TextField} from "@mui/material";
import {Grid} from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';

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
      await fetch(url, {
        method: 'post',
        body: data,
      });
      setMessage(prevState => ({...prevState, message: ""}));
    } catch (e) {
      console.log("Error: ", e);
    }
  }

  return (
    <form
      onSubmit={(e) => sendMessage(e)}>
      <Grid container spacing={2}>
        <Grid item xs={2}>
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
        </Grid>
        <Grid item xs={8}>
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
        </Grid>
        <Grid item xs={2}>
          <Button
            sx={{height: "56px", margin: "15px 0 0 0"}}
            startIcon={<EmailIcon/>}
            fullWidth
            variant="contained"
            type="submit">Send</Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default MessageForm;