import { useState } from "react";

// styles
import "./Switch.css";

interface Props {
  activeColor?: string;
  inactiveColor?: string;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
}

export const Switch = ({
  activeColor = "#4ADE80",
  inactiveColor = "#CBD5E1",
  defaultChecked = false,
  onChange = () => {},
  disabled = false,
  label = "",
}: Props) => {
  const [isChecked, setIsChecked] = useState(defaultChecked);

  const handleToggle = () => {
    if (disabled) return;

    const newValue = !isChecked;
    setIsChecked(newValue);
    onChange(newValue);
  };

  const switchVars = {
    "--active-color": activeColor,
    "--inactive-color": inactiveColor,
  };

  return (
    <div className="switch-container">
      {label && (
        <span className={`switch-label ${disabled ? "disabled" : ""}`}>
          {label}
        </span>
      )}
      <div
        className={`switch ${isChecked ? "checked" : ""} ${
          disabled ? "disabled" : ""
        }`}
        style={switchVars as React.CSSProperties}
        onClick={handleToggle}
        role="switch"
        aria-checked={isChecked}
        tabIndex={disabled ? -1 : 0}
      >
        <input
          type="checkbox"
          className="switch-input"
          checked={isChecked}
          onChange={() => {}}
          disabled={disabled}
        />
        <span className="switch-slider">
          <span className="switch-circle"></span>
        </span>
      </div>
    </div>
  );
};
