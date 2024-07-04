import { Box, Typography } from "@mui/material";
import { useCurrentUser } from "../hooks/users.hooks";
import { GitHub, LinkedIn } from "@mui/icons-material";

const Footer = () => {
  const currentUser = useCurrentUser();

  return (
    <Box display={"flex"} justifyContent={"space-between"} mt={'50px'}>
      <Typography variant="caption" color={"white"} flexGrow={1}>
        © Northeastern Electric Racing, 2024
      </Typography>
      <Box display={"flex"}>
        <a
          style={{ color: "white", marginRight: "10px" }}
          href={currentUser.githubLink}
          target="_blank"
          rel="noreferrer"
        >
          <GitHub />
        </a>
        <a
          style={{ color: "white", marginRight: "10px" }}
          href={currentUser.linkedInLink}
          target="_blank"
          rel="noreferrer"
        >
          <LinkedIn />
        </a>
      </Box>
    </Box>
  );
};

export default Footer;
