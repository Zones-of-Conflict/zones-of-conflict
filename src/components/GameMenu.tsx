import { Box, Button, TextField } from "@mui/material";
import { MainContext } from "../contexts/MainContext";
import { useContext, useState } from "react";

export default function GameMenu() {
  const { createMatch, joinMatch } = useContext(MainContext);

  const defaultValues = {
    matchId: "",
  };

  const [formValues, setFormValues] = useState(defaultValues);
  console.log(formValues);
  return (
    <Box display={"flex"} flexDirection={"row"} gap={5}>
      <Button onClick={() => createMatch()} variant={"contained"}>
        Create a Match
      </Button>

      <TextField
        id="match-id-input"
        label="match id"
        type="number"
        value={formValues.matchId}
        onChange={(e) => setFormValues({ ...formValues, matchId: e.target.value })}
      />

      <Button onClick={() => joinMatch(formValues.matchId)} variant={"contained"}>
        Join a Match
      </Button>
    </Box>
  );
}
