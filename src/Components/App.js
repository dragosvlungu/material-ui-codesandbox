import React, { Component } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Header, Footer } from "../Layouts";
import Execises from "../Exercises";
import { muscles, exercises } from "../store";

import { Provider } from "../context";

export default class extends Component {
  state = {
    exercises,
    exercise: {}
  };

  getExercisesByMuscles() {
    const initialExercises = muscles.reduce(
      (exercises, category) => ({
        ...exercises,
        [category]: []
      }),
      {}
    );

    return Object.entries(
      this.state.exercises.reduce((exercises, ex) => {
        const { muscles } = ex;

        exercises[muscles] = [...exercises[muscles], ex];

        return exercises;
      }, initialExercises)
    );
  }

  handleCategorySelect = category => {
    this.setState({
      category
    });
  };

  handleExerciseSelect = id => {
    this.setState(prevState => ({
      exercise: prevState.exercises.find(ex => ex.id === id),
      editMode: false
    }));
  };

  handleExerciseCreate = exercise => {
    this.setState({
      exercises: [...exercises, exercise]
    });
  };

  handleExerciseDelete = id => {
    this.setState(prevState => ({
      exercises: prevState.exercises.filter(ex => ex.id !== id),
      editMode: false,
      exercise: {}
    }));
  };

  handleExerciseSelectEdit = id => {
    this.setState(prevState => ({
      exercise: prevState.exercises.find(ex => ex.id === id),
      editMode: true
    }));
  };

  handleExerciseEdit = exercise => {
    this.setState(prevState => ({
      exercises: [
        ...prevState.exercises.filter(ex => ex.id !== exercise.id),
        exercise
      ],
      exercise
    }));
  };

  getContext = () => ({
    muscles,
    ...this.state,
    exercisesByMuscles: this.getExercisesByMuscles(),
    onCreate: this.handleExerciseCreate,
    onCategorySelect: this.handleCategorySelect,
    onSelect: this.handleExerciseSelect,
    onSelectEdit: this.handleExerciseSelectEdit,
    onEdit: this.handleExerciseEdit,
    onDelete: this.handleExerciseDelete
  });

  render() {
    return (
      <Provider value={this.getContext()}>
        <CssBaseline />
        <Header />

        <Execises />

        <Footer />
      </Provider>
    );
  }
}
