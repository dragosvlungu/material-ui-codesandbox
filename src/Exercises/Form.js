import React, { Component } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  TextField,
  Select,
  Button
} from "@material-ui/core";
export default class extends Component {
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
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleSubmit = () => {
    this.props.onSubmit({
      id: this.state.title.toLocaleLowerCase().replace(/ /g, "-"),
      ...this.state
    });
  };

  render() {
    const { title, description, muscles } = this.state,
      { exercise, muscles: categories } = this.props;

    return (
      <form>
        <TextField
          label="Title"
          value={title}
          onChange={this.handleChange("title")}
          margin="normal"
          fullWidth
        />
        <br />
        <FormControl fullWidth>
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
          fullWidth
        />
        <br />
        <Button
          color="primary"
          variant="contained"
          onClick={this.handleSubmit}
          disabled={!title || !muscles}
        >
          {exercise ? "Edit" : "Create"}
        </Button>
      </form>
    );
  }
}
