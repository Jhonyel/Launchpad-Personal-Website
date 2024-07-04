/*
 * This file is part of NER's FinishLine and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Box, Typography } from "@mui/material";
import Container from "@mui/material/Container";

interface ErrorPageProps {
  message?: string;
  error?: Error;
}

// Common page to display an error
const ErrorPage: React.FC<ErrorPageProps> = ({ message, error }) => {
  return (
    <Box>
      <Typography variant="h3">Oops, sorry!</Typography>
      <Typography variant="h5">There was an error loading the page.</Typography>
      {message ? <p>{message}</p> : ""}
      {error ? (
        <Container>
          {JSON.stringify(error, Object.getOwnPropertyNames(error))}
        </Container>
      ) : null}
    </Box>
  );
};

export default ErrorPage;
