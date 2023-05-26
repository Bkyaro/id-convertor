import "./App.css";
import { useEffect } from "react";
import Item from "./components/card";

function App() {
  useEffect(() => {
    document.body.classList.add(
      "bg-gradient-to-r",
      "from-slate-400",
      "to-slate-500",
      "relative"
    );
  }, []);

  return (
    <div className="h-full w-full flex items-center justify-center gap-4 p-7 flex-wrap">
      <>
        <Item />
      </>
    </div>
  );
}

export default App;
