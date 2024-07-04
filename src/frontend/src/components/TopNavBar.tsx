import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import { useCurrentUser } from "../hooks/users.hooks";
import { Box, Button, IconButton, Menu, MenuItem, Avatar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { MouseEvent, useState } from "react";
import { urls } from "../utils/urls";
import { useHistory } from "react-router-dom";

const pages = ["Home", "Projects", "Experiences"];

const TopNavBar = () => {
  const currentUser = useCurrentUser();
  const history = useHistory();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const page = history.location.pathname.split("/")[1];
  const currentPage = pages.map((p) => p.toLowerCase()).indexOf(page || "home");

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const setCurrentPage = (index: number) => {
    setCurrentPageIndex(index);
    history.push(pages[index].toLowerCase());
    handleCloseNavMenu();
  };

  const [currentPageIndex, setCurrentPageIndex] = useState(currentPage ?? 0);

  return (
    <AppBar
      sx={{ background: "#434343", height: "fit-content" }}
      position="sticky"
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {currentUser.username}
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page, index) => (
                <MenuItem key={page} onClick={() => setCurrentPage(index)}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {currentUser.username}
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page, index) => (
              <Button
                key={page}
                onClick={() => setCurrentPage(index)}
                sx={{
                  my: 2,
                  color: index === currentPageIndex ? "#ef4343" : "inherit",
                  display: "block",
                  ":hover": {
                    textDecoration: "underline",
                    color: "#ef4343",
                  },
                }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Avatar alt="Profile Pic" src={urls.IMAGES(currentUser.imageUrl)} />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default TopNavBar;
