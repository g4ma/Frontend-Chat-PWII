import * as React from "react";

type Props = {
  size?: string;
} & React.SVGProps<SVGSVGElement>;

const ProfileIcon: React.FC<Props> = ({ size, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    width={size || "20"}
    height={size || "20"}
    viewBox="0 0 32 32"
  >
    <g fill="#fafafa">
      <circle cx="16" cy="15.13" r="3.63" data-original="#000000"></circle>
      <path
        d="M7 30h18c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7C4.24 2 2 4.24 2 7v18c0 2.76 2.24 5 5 5m9-20.5c3.1 0 5.63 2.52 5.63 5.63 0 3.1-2.53 5.63-5.63 5.63s-5.63-2.53-5.63-5.63c0-3.11 2.53-5.63 5.63-5.63m-4.89 12.41h9.78c2.97 0 5.39 2.42 5.39 5.4 0 .14-.01.27-.03.41-.38.18-.81.28-1.25.28h-.94c.14-.2.22-.44.22-.69 0-1.87-1.52-3.4-3.39-3.4h-9.78c-1.87 0-3.39 1.53-3.39 3.4 0 .25.08.49.23.69H7c-.44 0-.87-.1-1.25-.28-.02-.14-.03-.27-.03-.41 0-2.98 2.42-5.4 5.39-5.4"
        data-original="#000000"
      ></path>
    </g>
  </svg>
);

export default ProfileIcon;
