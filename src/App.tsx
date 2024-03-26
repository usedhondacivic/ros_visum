import "react-mosaic-component/react-mosaic-component.css";

import { ROSLibContextProvider } from "./components/roslibProvider";
import WindowManager from "./components/windowManager";

function App() {
  return (
    <ROSLibContextProvider>
      <WindowManager />
    </ROSLibContextProvider>
  );
}

export default App;
