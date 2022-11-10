import { Box, Button, TextField } from "@mui/material";
import { MainContext } from "../contexts/MainContext";
import { useContext, useState } from "react";

export default function GameMenu() {
  const { startMatch, joinmatch } = useContext(MainContext);

  const defaultValues = {
    matchId: "",
  };

  const [formValues, setFormValues] = useState(defaultValues);
  console.log(formValues);
  return (
    <Box display={"flex"} flexDirection={"row"} gap={5}>
      <Button onClick={() => startMatch()} variant={"contained"}>
        Start a Match
      </Button>

      <TextField
        id="match-id-input"
        label="match id"
        type="number"
        value={formValues.matchId}
        onChange={(e) =>
          setFormValues({ ...formValues, matchId: e.target.value })
        }
      />

      <Button
        onClick={() => joinmatch(formValues.matchId)}
        variant={"contained"}
      >
        Join a Match
      </Button>
    </Box>
  );
}
