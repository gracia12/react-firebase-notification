import { FC, ReactElement, MouseEventHandler } from "react";
import "./index.scss";

interface ButtonProps {
  title: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const Button: FC<ButtonProps> = ({ title, onClick }): ReactElement => {
  return (
    <button className="common-btn" onClick={onClick}>
      {title}
    </button>
  );
}

export default Button;