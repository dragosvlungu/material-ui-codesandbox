import React, { Component } from "react";
import { Tab, Tabs, AppBar } from "@material-ui/core";
import withWidth from "@material-ui/core/withWidth";

import { withContext } from "../context";

class Footer extends Component {
  onIndexSelect = (e, index) => {
    const { onCategorySelect, muscles } = this.props;
    return onCategorySelect(index === 0 ? "" : muscles[index - 1]);
  };

  getIndex = () => {
    const { muscles, category } = this.props;
    return category ? muscles.findIndex(group => group === category) + 1 : 0;
  };

  render() {
    const { muscles, width } = this.props;
    return (
      <AppBar position="static">
        <Tabs
          value={this.getIndex()}
          onChange={this.onIndexSelect}
          indicatorColor="secondary"
          textColor="secondary"
          centered={width !== "xs"}
         variant={width === "xs" ? "scrollable" : "standard"}

        >
          <Tab /*style={{ color: "red" }}*/ label="All" />
          {muscles.map(group => (
            <Tab key={group} label={group} />
          ))}
        </Tabs>
      </AppBar>
    );
  }
}

export default withContext(withWidth()(Footer));
