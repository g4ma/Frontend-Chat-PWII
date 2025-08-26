import { MainDiv } from "./ChatSidebar.style";

interface ChatSidebarProps {
  children: React.ReactNode;
}

export default function ChatSidebar({ children }: ChatSidebarProps) {
  return <MainDiv>{children}</MainDiv>;
}