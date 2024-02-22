import React, { useState } from "react";
import { Box, Button, Grid, Paper, Typography, TextField } from "@mui/material";

export function Task({ task, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(task.name || "");
  const [editedDescription, setEditedDescription] = useState(
    task.description || ""
  );

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    onUpdate({ ...task, name: editedName, description: editedDescription });
    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    onDelete(task.id);
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="1vh"
    >
      <Paper
        sx={{
          p: 2,
          mb: 2,
          bgcolor: "background.paper",
          color: "text.primary",
          maxWidth: "750px",
          width: "100%",
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{ ml: 0 }}
          display="flex"
          flexDirection="row"
        >
          {/* NOMBRE */}
          <Grid item flex="1" xs={3} sx={{ m: "auto" }}>
            {isEditing ? (
              <TextField
                label="Name"
                variant="outlined"
                color="secondary"
                fullWidth
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
              />
            ) : (
              <Typography variant="h4">
                {editedName ? editedName : "no name"}
              </Typography>
            )}
          </Grid>

          {/* DESCRIPCION */}
          <Grid item flex="1" xs={5} sx={{ p: 0, width: "100%", m: "auto" }}>
            {isEditing ? (
              <TextField
                label="Description"
                variant="outlined"
                color="secondary"
                fullWidth
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
              />
            ) : (
              <Typography variant="body1">
                {editedDescription ? editedDescription : "no description"}
              </Typography>
            )}
          </Grid>

          {/* BOTONES */}
          <Grid item xs={3} sx={{ p: 0, m: "auto" }}>
            {isEditing ? (
              <Button
                sx={{ m: 0, marginRight: "3px" }}
                variant="contained"
                color="success"
                onClick={handleSaveClick}
              >
                Save
              </Button>
            ) : (
              <>
                <Button
                  sx={{ m: 0, marginRight: "3px" }}
                  variant="contained"
                  color="secondary"
                  onClick={handleEditClick}
                >
                  Edit
                </Button>
                <Button
                  sx={{ m: 0 }}
                  variant="contained"
                  color="error"
                  onClick={handleDeleteClick}
                >
                  Delete
                </Button>
              </>
            )}
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
