import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  currentRoom: null,
  currentMessage: "",
  isLogin: false,
  messages: null,
  reply: null,
  emoji: false,
};

const ChatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    userReceive: (state, action) => {
      state.currentUser = action.payload;
      state.isLogin = true;
      sessionStorage.setItem("currentUser", action.payload);
    },
    userLogout: (state) => {
      state.currentUser = null;
      state.currentRoom = null;
      state.isLogin = false;
      sessionStorage.removeItem("currentUser");
      sessionStorage.removeItem("currentRoom");
    },
    roomReceive: (state, action) => {
      state.currentRoom = action.payload;
      sessionStorage.setItem("currentRoom", action.payload);
    },
    messageReceive: (state, action) => {
      state.messages = action.payload;
    },
    messageCurrent: (state, action) => {
      state.currentMessage = action.payload;
    },
    messageAdd: (state, action) => {
      if (!Array.isArray(state.messages)) {
        state.messages = [];
      }
      state.messages.push(action.payload);
    },
    messageSave: (state) => {
      localStorage.setItem("messages", JSON.stringify(state.messages));
    },
    messageReply: (state, action) => {
      state.reply = state.messages.find((m) => m._id === action.payload);
    },
    emojiShow: (state, action) => {
      state.emoji = action.payload;
    },
  },
});

const { reducer: chatReducer, actions } = ChatSlice;
const {
  userReceive,
  roomReceive,
  userLogout,
  messageReceive,
  messageCurrent,
  messageAdd,
  messageSave,
  messageReply,
  emojiShow,
} = actions;

export const auth = (payload) => async (dispatch) => {
  dispatch(userReceive(payload.user));
  dispatch(roomReceive(payload.room));
};

export const logout = () => (dispatch) => {
  dispatch(userLogout());
};

export const loadMessages = () => (dispatch) => {
  const messages = localStorage.getItem("messages");
  dispatch(messageReceive(JSON.parse(messages)));
};

export const getMessages = () => (state) => state.chat.messages;

export const sendCurrentMessage = (payload) => (dispatch) =>
  dispatch(messageCurrent(payload));

export const sendMessage = (payload) => (dispatch) => {
  dispatch(messageAdd(payload));
  dispatch(messageSave());
};

export const replyMessage = (payload) => (dispatch) => {
  dispatch(messageReply(payload));
};

export const getMessagesRoom = (payload) => (state) => {
  if (state.chat.messages) {
    return state.chat.messages.filter((m) => m.room === payload);
  }
};

export const getRepliedMessage = () => (state) => state.chat.reply;
export const isLogin = () => (state) => state.chat.isLogin;
export const getCurrentUser = () => (state) => state.chat.currentUser;
export const getCurrentRoom = () => (state) => state.chat.currentRoom;
export const getCurrentMessage = () => (state) => state.chat.currentMessage;
export const showEmoji = (payload) => (dispatch) =>
  dispatch(emojiShow(payload));
export const getShowEmoji = () => (state) => state.chat.emoji;

export default chatReducer;
