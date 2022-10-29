import {
  Box,
  Container,
  Paper,
  Toolbar,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../store/chat";

const LoginLayout = () => {
  const [room, setRoom] = useState("");
  const [user, setUser] = useState("");
  const dispatch = useDispatch();
  const handleChangeUser = (e) => {
    setUser(e.target.value);
  };
  const handleChangeRoom = (e) => {
    setRoom(e.target.value);
  };
  const handleSubmit = () => {
    dispatch(auth({ user, room }));
  };
  return (
    <Container maxWidth="sm">
      <Toolbar />
      <Paper variant="outlined">
        <Box
          height={"250px"}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
          p={3}
        >
          <Typography variant="h5" align="center" m={1}>
            Авторизация
          </Typography>
          <TextField
            id="outlined-basic"
            label="Имя"
            variant="outlined"
            onChange={handleChangeUser}
          />
          <FormControl fullWidth>
            <InputLabel id="select-room">Комната</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="select-room"
              value={room}
              label="Комната"
              onChange={handleChangeRoom}
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={user.length === 0 || room.length === 0}
          >
            Войти
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginLayout;
