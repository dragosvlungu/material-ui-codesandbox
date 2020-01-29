import React, { Component } from "react";
import { FormControl } from "material-ui/Form";
import { InputLabel } from "material-ui/Input";
import { MenuItem } from "material-ui/Menu";
import { TextField, Select, Button } from "material-ui";
import { withStyles } from "material-ui/styles";

const styles = theme => ({
  FormControl: {
    width: 300
  }
});

export default withStyles(styles)(
  class extends Component {
    state = this.getInitialState();

    getInitialState() {
      const { exercise } = this.props;

      return exercise
        ? exercise
        : {
            title: "",
            description: "",
            muscles: ""
          };
    }

    componentWillReceiveProps(nextProps) {
      this.setState({ ...nextProps.exercise });
    }

    handleChange = name => event => {
      this.setState({
        [name]: event.target.value
      });
    };

    handleSubmit = () => {
      // TODO: validate

      this.props.onSubmit({
        id: this.state.title.toLocaleLowerCase().replace(/ /g, "-"),
        ...this.state
      });

      this.setState(this.getInitialState());
    };

    render() {
      const { title, description, muscles } = this.state,
        { classes, exercise, muscles: categories } = this.props;

      return (
        <form>
          <TextField
            label="Title"
            value={title}
            onChange={this.handleChange("title")}
            margin="normal"
            className={classes.FormControl}
          />
          <br />
          <FormControl className={classes.FormControl}>
            <InputLabel htmlFor="muscles">Muscles</InputLabel>
            <Select value={muscles} onChange={this.handleChange("muscles")}>
              {categories.map(category => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <br />
          <TextField
            label="Description"
            value={description}
            onChange={this.handleChange("description")}
            margin="normal"
            multiline
            rowsMax="4"
            className={classes.FormControl}
          />
          <br />
          <Button color="primary" variant="raised" onClick={this.handleSubmit}>
            {exercise ? "Edit" : "Create"}
          </Button>
        </form>
      );
    }
  }
);
