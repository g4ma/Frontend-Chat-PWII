import * as React from "react";

type Props = {
    color?: string;
    size?: string;
} & React.SVGProps<SVGSVGElement>;

const SmallDot: React.FC<Props> = ({ size, color, ...props }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlSpace="preserve"
        width={size || "10"}
        height={size || "10"}
        viewBox="0 0 24 24"
    >
        <g fill={color || "#000"}>
            <circle cx="12" cy="12" r="12" data-original="#000000"></circle >
        </g>
    </svg>
);

export default SmallDot;
