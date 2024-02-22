import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      position="static"
      sx={{
        background: "black",
        color: "white",
        width: "100%",
        paddingBlock: 1,
      }}
    >
      <Typography variant="body1" color="inherit" sx={{ textAlign: "center" }}>
        © {new Date().getFullYear()} - Bava F. Tomas
      </Typography>
    </Box>
  );
};

export default Footer;
