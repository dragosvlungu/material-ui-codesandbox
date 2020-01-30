import React, { Fragment } from "react";
import {
  Grid,
  Paper,
  Typography,
  List,
  IconButton,
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from "@material-ui/core";
import { withStyles } from "@material-ui/core";

import { Delete, Edit } from "@material-ui/icons";
import Form from "./Form";

const styles = {
  Paper: {
    padding: 20,
    marginTop: 5,
    height: 500,
    overflowY: "auto"
  }
};

export default withStyles(styles)(
  ({
    classes,
    exercises,
    category,
    muscles,
    exercise,
    editMode,
    onSelect,
    onDelete,
    onSelectEdit,
    onEdit,
    exercise: {
      id,
      title = "Welcome!",
      description = "Please select an exercise from the list on the left."
    }
  }) => (
    <Grid container>
      <Grid item xs={12} sm={6}>
        <Paper className={classes.Paper}>
          {exercises.map(([group, exercises]) =>
            !category || category === group ? (
              <Fragment key={group}>
                <Typography
                  variant="headline"
                  style={{ textTransform: "capitalize" }}
                >
                  {group}
                </Typography>
                <List component="ul">
                  {exercises.map(({ id, title }) => (
                    <ListItem key={id} onClick={() => onSelect(id)} button>
                      <ListItemText primary={title} />
                      <ListItemSecondaryAction>
                        <IconButton onClick={() => onSelectEdit(id)}>
                          <Edit />
                        </IconButton>
                        <IconButton onClick={() => onDelete(id)}>
                          <Delete />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </Fragment>
            ) : null
          )}
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Paper className={classes.Paper}>
          <Typography variant="display1" gutterBottom>
            {title}
          </Typography>
          {editMode ? (
            <Form
              key={id}
              muscles={muscles}
              onSubmit={onEdit}
              exercise={exercise}
            />
          ) : (
            <Typography variant="subheading">{description}</Typography>
          )}
        </Paper>
      </Grid>
    </Grid>
  )
);
