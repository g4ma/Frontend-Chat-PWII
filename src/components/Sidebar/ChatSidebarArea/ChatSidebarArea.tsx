import { MainDiv } from "./ChatSidebarArea.style";

interface ChatSidebarAreaProps {
  children: React.ReactNode;
}

export default function ChatSidebarAreaArea({ children }: ChatSidebarAreaProps) {
  return <MainDiv>{children}</MainDiv>;
}