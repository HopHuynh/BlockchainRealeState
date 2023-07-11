import React from "react";

import { indexApi } from "../ContextApi/IdContextApi";
const IndexHandler = ({ children }) => {
  const [id, setId] = React.useState({});

  const value = {
    setId,
    id,
  };

  return <indexApi.Provider value={value}>{children}</indexApi.Provider>;
};

export default IndexHandler;
