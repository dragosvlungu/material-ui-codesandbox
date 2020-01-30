import React, { Component, Fragment } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Header, Footer } from "../Layouts";
import Execises from "../Exercises";
import { muscles, exercises } from "../store";

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

  render() {
    const exercises = this.getExercisesByMuscles(),
      { category, exercise, editMode } = this.state;
    return (
      <Fragment>
        <CssBaseline />
        <Header
          muscles={muscles}
          onExerciseCreate={this.handleExerciseCreate}
        />

        <Execises
          exercises={exercises}
          exercise={exercise}
          category={category}
          muscles={muscles}
          editMode={editMode}
          onSelect={this.handleExerciseSelect}
          onDelete={this.handleExerciseDelete}
          onSelectEdit={this.handleExerciseSelectEdit}
          onEdit={this.handleExerciseEdit}
        />

        <Footer
          muscles={muscles}
          category={category}
          onSelect={this.handleCategorySelect}
        />
      </Fragment>
    );
  }
}
