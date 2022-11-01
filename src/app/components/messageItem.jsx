import { IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser, replyMessage } from "../store/chat";
import ReplyIcon from "@mui/icons-material/Reply";

const MessageItem = ({ data }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser());
  const isOwner = data.user === currentUser;
  return (
    <>
      {isOwner ? (
        <Box
          m={1}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "end",
          }}
        >
          <Typography variant="caption" component={"span"}>
            {data.user}
          </Typography>
          <Box
            sx={{
              bgcolor: "#9dd0fa",
              maxWidth: "250px",
              p: 1,
              borderRadius: "7px 0 7px 7px",
            }}
          >
            {data.reply && (
              <Box
                p={1}
                sx={{
                  boxSizing: "border-box",
                  width: "100%",
                  backgroundColor: "#85c2ff",
                  borderRadius: "0 3px 3px 0",
                  borderLeft: "2px solid #1E90FF",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {data.reply.attach && (
                  <Box>
                    <img src={data.reply.attach} width={240} />
                  </Box>
                )}
                <Typography variant="caption">{data.reply.user}</Typography>
                <Typography variant="caption">{data.reply.message}</Typography>
              </Box>
            )}
            {data.attach && (
              <Box>
                <img src={data.attach} width={240} />
              </Box>
            )}
            {data.message}
          </Box>
        </Box>
      ) : (
        <>
          <Box m={1}>
            <Typography variant="caption" component={"span"}>
              {data.user}
            </Typography>
            <Box sx={{ display: "flex" }}>
              <Box
                sx={{
                  bgcolor: "#ddeeff",
                  maxWidth: "max-content",
                  p: 1,
                  borderRadius: "0 7px 7px 7px",
                }}
              >
                {data.reply && (
                  <Box
                    p={1}
                    sx={{
                      boxSizing: "border-box",
                      width: "100%",
                      backgroundColor: "#85c2ff",
                      borderRadius: "0 3px 3px 0",
                      borderLeft: "2px solid #1E90FF",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    {data.reply.attach && (
                      <Box>
                        <img src={data.reply.attach} width={240} />
                      </Box>
                    )}
                    <Typography variant="caption">{data.reply.user}</Typography>
                    <Typography variant="caption">
                      {data.reply.message}
                    </Typography>
                  </Box>
                )}
                {data.attach && (
                  <Box>
                    <img src={data.attach} width={240} />
                  </Box>
                )}
                {data.message}
              </Box>
              {!data.reply && (
                <IconButton onClick={() => dispatch(replyMessage(data._id))}>
                  <ReplyIcon />
                </IconButton>
              )}
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

export default MessageItem;
