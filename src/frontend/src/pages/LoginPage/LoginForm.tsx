/*
 * This file is part of NER's FinishLine and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import LoginIcon from "@mui/icons-material/Login";
import FormControl from "@mui/material/FormControl";
import { FormEvent } from "react";
import { Box, Typography } from "@mui/material";
import { useGetAllUsers } from "../../hooks/users.hooks";
import LoadingIndicator from "../../components/LoadingIndicator";

interface LoginFormProps {
  setUser: (userId: string) => void;
  formSubmit: (e: FormEvent) => void;
}

/**
 * Form for dev users to do login on the dev environment.
 */
const LoginForm: React.FC<LoginFormProps> = ({ setUser, formSubmit }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { isLoading, data: usersList } = useGetAllUsers();

  if (!usersList || isLoading) return <LoadingIndicator />;

  if (usersList.length === 0)
    return <Typography>No Users Available</Typography>;

  const sortedUsers = usersList.sort((a, b) =>
    a.username.localeCompare(b.username)
  );

  return (
    <Box display={"flex"} justifyContent={"center"} width={"100%"}>
      <form onSubmit={formSubmit}>
        <FormControl
          sx={{ marginTop: 2, background: "#434343", width: "300px" }}
        >
          <InputLabel id="localDevUser" sx={{ color: "white" }}>
            Select a User
          </InputLabel>
          <Select
            label="Select a User"
            labelId="localDevUser"
            onChange={(e) => setUser(e.target.value)}
            defaultValue={""}
            endAdornment={
              <IconButton type="submit" color="success" sx={{ marginRight: 2 }}>
                <LoginIcon />
              </IconButton>
            }
          >
            {sortedUsers.map((user) => (
              <MenuItem key={user.id} value={user.id}>
                {user.username} ({user.role.toLowerCase()})
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </form>
    </Box>
  );
};

export default LoginForm;
