import React from "react";

interface IconProps {
  className?: string;
}

export const XIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export const TelegramIcon: React.FC<IconProps> = ({
  className = "w-6 h-6",
}) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M22.05 2.507c0.36 0.318 0.498 0.832 0.345 1.293l-4.114 12.34c-0.086 0.257-0.258 0.468-0.485 0.594-0.227 0.126-0.487 0.163-0.737 0.105l-5.937-1.392-3.135 3.135c-0.307 0.307-0.757 0.398-1.153 0.233-0.396-0.166-0.655-0.552-0.655-0.982V15.01l-4.467-1.048c-0.489-0.115-0.843-0.534-0.877-1.037-0.034-0.502 0.264-0.966 0.73-1.148L20.91 2.292c0.352-0.138 0.752-0.103 1.14 0.215zM18.6 5.832L9.124 13.552l4.849 1.137 4.627-8.857z" />
  </svg>
);
