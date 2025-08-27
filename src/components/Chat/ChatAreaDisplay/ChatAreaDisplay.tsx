import { MainDiv } from "./ChatAreaDisplay.style";

interface ChatAreaProps {
  children: React.ReactNode;
}  

export default function ChatAreaDisplay({ children }: ChatAreaProps) {
  return <MainDiv>{children}</MainDiv>;
}