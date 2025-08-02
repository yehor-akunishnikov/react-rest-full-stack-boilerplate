import { RouterProvider } from "react-router";
import { Provider } from "react-redux";

import { store } from "./data/store";
import router from "./router";
import "./App.css";

function App() {
  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </>
  );
}

export default App;
