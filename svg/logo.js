const Logo = ({ width = "52", height = "52" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 52 52"
      width={width}
      height={height}
      transform="translate(-8, 16)"
    >
      <defs>
        <linearGradient gradientUnits="objectBoundingBox" id="a" spreadMethod="pad" x1={0} x2="100%" y1={0} y2={0}>
          <stop offset="0%" stopColor="#3F61B5" />
          <stop offset="100%" stopColor="#F50057" />
        </linearGradient>
        <linearGradient gradientUnits="objectBoundingBox" id="b" spreadMethod="pad" x1="0%" x2="100%" y1="0%" y2="0%">
          <stop
            offset="0%"
            stopColor="#3f51b5"
            style={{
              stopOpacity: 1
            }}
          />
          <stop offset="100%" stopColor="#F50057" />
        </linearGradient>
      </defs>
      <circle
        cx={29}
        cy={25}
        style={{
          stroke: "url(#a)",
          strokeWidth: 1,
          fill: "none"
        }}
        r={8}
        transform="matrix(2.25 0 0 2.25 -39.25 -30.25)"
      />
      <path
        d="m4.395-2.393-1.27-1.982v1.25a5 5 0 0 0-6.25 6.25 4.34 4.34 0 0 1 6.223-4.913V0l1.297-2.386Z"
        style={{
          fill: "url(#b)",
          vectorEffect: "non-scaling-stroke",
          strokeWidth: 1
        }}
        transform="translate(26.122 28.841) scale(3.04151)"
      />
    </svg>
  );
};

export default Logo;
