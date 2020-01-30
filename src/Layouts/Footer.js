import React from "react";
import { Paper, Tab, Tabs } from "@material-ui/core";
import withWidth from "@material-ui/core/withWidth";

export default withWidth()(({ muscles, category, onSelect, width }) => {
  //console.log(width);
  const index = category
    ? muscles.findIndex(group => group === category) + 1
    : 0;

  const onIndexSelect = (e, index) =>
    onSelect(index === 0 ? "" : muscles[index - 1]);

  return (
    <Paper>
      <Tabs
        value={index}
        onChange={onIndexSelect}
        indicatorColor="secondary"
        textColor="primary"
        centered={width !== "xs"}
        scrollable={width === "xs"}
      >
        <Tab /*style={{ color: "red" }}*/ label="All" />
        {muscles.map(group => (
          <Tab key={group} label={group} />
        ))}
      </Tabs>
    </Paper>
  );
});
