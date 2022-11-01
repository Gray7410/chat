import {
  Toolbar,
  Paper,
  Typography,
  IconButton,
  Box,
  Container,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  getCurrentRoom,
  getMessagesRoom,
  getRepliedMessage,
  loadMessages,
  getShowEmoji,
  getCurrentMessage,
  sendCurrentMessage,
} from "../store/chat";
import SendBox from "../components/sendBox";
import { useEffect } from "react";
import MessageItem from "../components/messageItem";
import CloseIcon from "@mui/icons-material/Close";
import { replyMessage } from "../store/chat";
import Picker from "@emoji-mart/react";

const MainLayout = () => {
  const message = useSelector(getCurrentMessage());
  const isShowEmoji = useSelector(getShowEmoji());
  const replyTo = useSelector(getRepliedMessage());
  const dispatch = useDispatch();
  const currentRoom = useSelector(getCurrentRoom());
  const messages = useSelector(getMessagesRoom(currentRoom));
    useEffect(() => {
    dispatch(loadMessages());
    window.addEventListener("storage", () => {
      dispatch(loadMessages());
    });
  }, []);
  const addEmoji = (e) => {
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    dispatch(sendCurrentMessage(message + emoji));
  };
  return (
    <Container maxWidth="sm">
      <Toolbar />
      <Paper variant="outlined">
        <Box
          sx={{
            m: 1,
            p: 1,
          }}
        >
          <Typography sx={{ textAlign: "center" }}>
            Комната {currentRoom}
          </Typography>
        </Box>
        <Box
          sx={{
            position: "relative",
            height: "500px",
            m: 2,
            p: 2,

            overflow: "auto",
          }}
        >
          {messages
            ? messages.map((m) => <MessageItem key={m._id} data={m} />)
            : "Нет сообщений"}
        </Box>
        {isShowEmoji && (
          <Box sx={{ position: "relative" }}>
            <Box sx={{ position: "absolute", left: "10px", bottom: "10px" }}>
              <Picker onEmojiSelect={addEmoji} />
            </Box>
          </Box>
        )}
        {replyTo && (
          <Box
            p={1}
            m={1}
            sx={{
              position: "relative",
              boxSizing: "border-box",
              width: "97%",
              backgroundColor: "#85c2ff",
              borderRadius: "0 3px 3px 0",
              borderLeft: "2px solid #1E90FF",
            }}
          >
            <Typography variant="caption">{replyTo.user}</Typography>
            <Typography>{replyTo.message}</Typography>
            <IconButton
              onClick={() => dispatch(replyMessage(null))}
              sx={{ position: "absolute", top: 0, right: 0 }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        )}

        <SendBox />
      </Paper>
    </Container>
  );
};

export default MainLayout;
