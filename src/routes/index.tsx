import React, { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

import AuthRoutes from "../routes/auth.app.routes";
import AppRoutes from "./app.routes";

function Routes() {
  const { signed } = useContext(AuthContext);

  return signed ? <AppRoutes /> : <AuthRoutes />;
}

export default Routes;
