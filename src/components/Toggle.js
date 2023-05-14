import { FaMoon } from "react-icons/fa";
import { useState } from "react";

export default function Toggle() {
  const [lightMode, setLightMode] = useState(false);

  const changeTheme = () => {
    document.body.classList.toggle("light");
    setLightMode(!lightMode);
  };

  return (
    <div className="toggle" onClick={changeTheme}>
      {lightMode ? (
        <div className="toggle-dark">
         <i class="far fa-moon"></i><p>Dark Mode</p>
        </div>
      ) : (
        <div className="toggle-light">
          <FaMoon />
          <p>Dark Mode</p>
        </div>
      )}
    </div>
  );
}
