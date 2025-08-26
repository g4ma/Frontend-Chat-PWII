import { MainDiv } from "./ChatArea.style";

interface ChatAreaProps {
  children: React.ReactNode;
}  

export default function ChatArea({ children }: ChatAreaProps) {
  return <MainDiv>{children}</MainDiv>;
}