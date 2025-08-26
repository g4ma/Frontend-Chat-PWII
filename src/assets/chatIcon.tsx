import * as React from "react";

type Props = {
  size?: string;
} & React.SVGProps<SVGSVGElement>;

const ChatIcon: React.FC<Props> = ({ size, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    width={size || "40"}
    height={size || "40"}
    viewBox="0 0 24 24"
  >
    <path
      fill="#fff"
      d="M18 1H6a5.006 5.006 0 0 0-5 5v8a5.01 5.01 0 0 0 4 4.9V22a1 1 0 0 0 1.555.832L12.3 19H18a5.006 5.006 0 0 0 5-5V6a5.006 5.006 0 0 0-5-5m-2 12H8a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2m2-4H6a1 1 0 0 1 0-2h12a1 1 0 0 1 0 2"
      data-original="#000000"
    ></path>
  </svg>
);

export default ChatIcon;
