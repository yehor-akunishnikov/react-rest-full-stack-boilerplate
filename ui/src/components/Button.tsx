import {Button} from "react-bootstrap";

type MyButtonProps = {
  label: string;
  onClick: () => void;
};

export function MyButton({ label, onClick }: MyButtonProps) {
  return <Button onClick={onClick}>{label}</Button>;
}
