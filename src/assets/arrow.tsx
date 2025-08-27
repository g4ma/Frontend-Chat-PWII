import * as React from "react";

type Props = {
    size?: string;
    color?: string;
} & React.SVGProps<SVGSVGElement>;

const Arrow: React.FC<Props> = ({ size, color }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlSpace="preserve"
        width={size || "50"}
        height={size || "50"}
        viewBox="0 0 512.001 512.001"
    >
        <g fill={color || "#000"}>
            <path
                d="M507.608 4.395a15 15 0 0 0-16.177-3.321L9.43 193.872a15.002 15.002 0 0 0-.975 27.424l190.068 92.181 92.182 190.068a14.999 14.999 0 0 0 27.423-.974l192.8-481.998a15 15 0 0 0-3.32-16.178M52.094 209.118 434.72 56.069 206.691 284.096zm250.789 250.789-74.979-154.599 228.03-228.027z"
                data-original="#000000"
            ></path>
        </g>
    </svg>
);

export default Arrow;
