import React, { Fragment, Component } from "react";
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

import { withContext } from "../context";

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    overflowY: "auto",
    [theme.breakpoints.up("sm")]: {
      marginTop: 5,
      height: "calc(100% - 10px)"
    },
    [theme.breakpoints.down("xs")]: {
      height: "100%"
    }
  },
  "@global": {
    "html, body, #root": {
      height: "100%"
    }
  },
  container: {
    [theme.breakpoints.up("sm")]: {
      height: "calc(100% - 64px - 48px)"
    },
    [theme.breakpoints.down("xs")]: {
      height: "calc(100% - 56px - 48px)"
    }
  },
  item: {
    [theme.breakpoints.down("xs")]: {
      height: "50%"
    }
  }
});

class Exercises extends Component {
  render() {
    const {
      classes,
      exercisesByMuscles,
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
    } = this.props;

    return (
      <Grid container className={classes.container}>
        <Grid item xs={12} sm={6} className={classes.item}>
          <Paper className={classes.paper}>
            {exercisesByMuscles.map(([group, exercises]) =>
              !category || category === group ? (
                <Fragment key={group}>
                  <Typography
                    color="secondary"
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
                          <IconButton
                            color="primary"
                            onClick={() => onSelectEdit(id)}
                          >
                            <Edit />
                          </IconButton>
                          <IconButton
                            color="primary"
                            onClick={() => onDelete(id)}
                          >
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
        <Grid item xs={12} sm={6} className={classes.item}>
          <Paper className={classes.paper}>
            <Typography variant="display1" color="secondary" gutterBottom>
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
    );
  }
}

export default withContext(withStyles(styles)(Exercises));
