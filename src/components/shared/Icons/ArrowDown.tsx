interface ArrowDownProps {
  size?: number;
  color?: string;
}

const ArrowDown = ({ size = 14, color = "#C8C8C8" }: ArrowDownProps) => (
  <svg width={size} height={size} viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.09496 6L7.20278 0.75H0.98713L4.09496 6Z" fill={color} />
  </svg>
);

export default ArrowDown;
