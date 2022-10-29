import {
  Box,
  TextField,
  Grid,
  FormControl,
  IconButton,
  Tooltip,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentUser,
  getCurrentRoom,
  sendMessage,
  getRepliedMessage,
  replyMessage,
  getShowEmoji,
  showEmoji,
  getCurrentMessage,
  sendCurrentMessage,
} from "../store/chat";
import { Image, InsertEmoticon } from "@mui/icons-material";
import { v4 as uuid } from "uuid";

const SendBox = () => {
  const isShowEmoji = useSelector(getShowEmoji());
  const idMessage = uuid().slice(0, 8);
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const repliedMessage = useSelector(getRepliedMessage());
  const message = useSelector(getCurrentMessage());
  const currentUser = useSelector(getCurrentUser());
  const currentRoom = useSelector(getCurrentRoom());
  const handleChange = (e) => {
    dispatch(sendCurrentMessage(e.target.value));
  };
  const handleSubmit = () => {
    dispatch(
      sendMessage({
        _id: idMessage,
        room: currentRoom,
        user: currentUser,
        message,
        attach: file,
        reply: repliedMessage ? { ...repliedMessage } : null,
      })
    );
    dispatch(sendCurrentMessage(""));
    setFile(null);
    dispatch(replyMessage(null));
    dispatch(showEmoji(false));
  };
  const handleUpload = (e) => {
    const url = URL.createObjectURL(e.target.files[0]);
    setFile(url);
  };
  return (
    <Box p={2} sx={{ borderTop: "1px solid Gainsboro" }}>
      <Grid container spacing={1} alignItems="center">
        <Grid id="emoji" xs={1} item>
          <Tooltip title={"Добавить эмоцию"}>
            <IconButton
              color="primary"
              component="label"
              onClick={() => dispatch(showEmoji(!isShowEmoji))}
            >
              <InsertEmoticon />
            </IconButton>
          </Tooltip>
        </Grid>

        <Grid id="attach" xs={1} item>
          <Tooltip title={"Добавить изображение"}>
            <IconButton color="primary" component="label">
              <Image />
              <input
                type="file"
                onChange={handleUpload}
                accept=".jpg,.jpeg,.png"
                hidden
              />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid id="message" xs={9} item>
          <FormControl fullWidth>
            <TextField
              id="outlined-basic"
              label="Сообщение"
              variant="outlined"
              value={message}
              onChange={handleChange}
            />
          </FormControl>
        </Grid>

        <Grid id="send" xs={1} item>
          <IconButton
            onClick={handleSubmit}
            color="primary"
            disabled={(message.length === 0) & !file ? true : false}
          >
            <SendIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SendBox;
