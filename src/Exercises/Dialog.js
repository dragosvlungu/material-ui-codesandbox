import React, { Fragment, Component } from "react";
import { Dialog, Button } from "@material-ui/core";
import {
  DialogTitle,
  DialogContent,
  DialogContentText
} from "@material-ui/core";

import { Add } from "@material-ui/icons";

import Form from "./Form";
import { withContext } from "../context";

class CreateDialog extends Component {
  state = {
    open: false
  };

  handleToggle = () => {
    this.setState(prevState => ({
      open: !prevState.open
    }));
  };

  handleFormSubmit = exercise => {
    this.handleToggle();
    this.props.onCreate(exercise);
  };

  render() {
    const { open } = this.state,
      { muscles } = this.props;

    return (
      <Fragment>
        <Button
          variant="fab"
          color="secondary"
          mini
          onClick={this.handleToggle}
        >
          <Add />
        </Button>
        <Dialog open={open} onClose={this.handleToggle} fullWidth maxWidth="xs">
          <DialogTitle>Create a new exercise</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please fill out the form bellow.
            </DialogContentText>
            <Form muscles={muscles} onSubmit={this.handleFormSubmit} />
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

export default withContext(CreateDialog);
