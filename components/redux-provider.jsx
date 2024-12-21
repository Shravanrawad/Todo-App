"use client";

import store from "@/app/redux/store/store";
import { Provider } from "react-redux";

export default function ReduxProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
