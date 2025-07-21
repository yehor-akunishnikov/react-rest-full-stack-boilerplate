import type { FC } from "react";

type ButtonProps = {
  label: string;
  onClick: () => void;
};

const Button: FC<ButtonProps> = ({ label, onClick }) => {
  return <button onClick={onClick}>{label}</button>;
};

export default Button;
