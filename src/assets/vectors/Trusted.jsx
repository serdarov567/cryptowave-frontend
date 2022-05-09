import React from "react";

export default function Trusted({
  pos,
  left,
  top,
  right,
  bottom,
  height,
  width,
}) {
  return (
    <div style={{ position: pos, left, top, right, bottom }}>
      <div
        style={{
          position: "absolute",
          backdropFilter: "blur(2px)",
          height: `${height}px`,
          width: `${width}px`,
          borderRadius: "10px",
          zIndex: 1,
        }}
      />
      <svg
        style={{ position: "absolute", zIndex: 2 }}
        width={width}
        height={height}
        viewBox="0 0 136 136"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_b_241_53)">
          <rect
            width="136"
            height="136"
            rx="10"
            fill="white"
            fill-opacity="0.04"
          />
          <rect
            x="0.5"
            y="0.5"
            width="135"
            height="135"
            rx="9.5"
            stroke="#474747"
            stroke-opacity="0.73"
          />
        </g>
        <path
          d="M41.888 110.84V101.128H38.16V99.32H47.544V101.128H43.816V110.84H41.888ZM48.0263 110.84V102.2H49.7303V104.304L49.5223 104.032C49.6289 103.744 49.7703 103.483 49.9463 103.248C50.1276 103.008 50.3436 102.811 50.5943 102.656C50.8076 102.512 51.0423 102.4 51.2983 102.32C51.5596 102.235 51.8263 102.184 52.0983 102.168C52.3703 102.147 52.6343 102.157 52.8903 102.2V104C52.6343 103.925 52.3383 103.901 52.0023 103.928C51.6716 103.955 51.3729 104.048 51.1063 104.208C50.8396 104.352 50.6209 104.536 50.4503 104.76C50.2849 104.984 50.1623 105.24 50.0823 105.528C50.0023 105.811 49.9623 106.117 49.9623 106.448V110.84H48.0263ZM57.6569 111.088C57.0169 111.088 56.4889 110.981 56.0729 110.768C55.6569 110.555 55.3262 110.283 55.0809 109.952C54.8355 109.621 54.6542 109.269 54.5369 108.896C54.4195 108.523 54.3422 108.171 54.3049 107.84C54.2729 107.504 54.2569 107.232 54.2569 107.024V102.2H56.2089V106.36C56.2089 106.627 56.2275 106.928 56.2649 107.264C56.3022 107.595 56.3875 107.915 56.5209 108.224C56.6595 108.528 56.8622 108.779 57.1289 108.976C57.4009 109.173 57.7662 109.272 58.2249 109.272C58.4702 109.272 58.7129 109.232 58.9529 109.152C59.1929 109.072 59.4089 108.936 59.6009 108.744C59.7982 108.547 59.9555 108.277 60.0729 107.936C60.1902 107.595 60.2489 107.163 60.2489 106.64L61.3929 107.128C61.3929 107.864 61.2489 108.531 60.9609 109.128C60.6782 109.725 60.2595 110.203 59.7049 110.56C59.1502 110.912 58.4675 111.088 57.6569 111.088ZM60.4809 110.84V108.16H60.2489V102.2H62.1849V110.84H60.4809ZM67.7685 111.08C66.7018 111.08 65.8352 110.84 65.1685 110.36C64.5018 109.88 64.0965 109.205 63.9525 108.336L65.9205 108.032C66.0218 108.459 66.2458 108.795 66.5925 109.04C66.9392 109.285 67.3765 109.408 67.9045 109.408C68.3685 109.408 68.7258 109.317 68.9765 109.136C69.2325 108.949 69.3605 108.696 69.3605 108.376C69.3605 108.179 69.3125 108.021 69.2165 107.904C69.1258 107.781 68.9232 107.664 68.6085 107.552C68.2938 107.44 67.8112 107.299 67.1605 107.128C66.4352 106.936 65.8592 106.731 65.4325 106.512C65.0058 106.288 64.6992 106.024 64.5125 105.72C64.3258 105.416 64.2325 105.048 64.2325 104.616C64.2325 104.077 64.3738 103.608 64.6565 103.208C64.9392 102.808 65.3338 102.501 65.8405 102.288C66.3472 102.069 66.9445 101.96 67.6325 101.96C68.3045 101.96 68.8992 102.064 69.4165 102.272C69.9392 102.48 70.3605 102.776 70.6805 103.16C71.0005 103.544 71.1978 103.995 71.2725 104.512L69.3045 104.864C69.2565 104.496 69.0885 104.205 68.8005 103.992C68.5178 103.779 68.1392 103.659 67.6645 103.632C67.2112 103.605 66.8458 103.675 66.5685 103.84C66.2912 104 66.1525 104.227 66.1525 104.52C66.1525 104.685 66.2085 104.827 66.3205 104.944C66.4325 105.061 66.6565 105.179 66.9925 105.296C67.3338 105.413 67.8405 105.557 68.5125 105.728C69.2005 105.904 69.7498 106.107 70.1605 106.336C70.5765 106.56 70.8752 106.829 71.0565 107.144C71.2432 107.459 71.3365 107.84 71.3365 108.288C71.3365 109.157 71.0192 109.84 70.3845 110.336C69.7552 110.832 68.8832 111.08 67.7685 111.08ZM78.1528 110.84C77.5821 110.947 77.0221 110.992 76.4728 110.976C75.9288 110.965 75.4408 110.867 75.0088 110.68C74.5768 110.488 74.2488 110.187 74.0247 109.776C73.8274 109.403 73.7234 109.021 73.7128 108.632C73.7021 108.243 73.6968 107.803 73.6968 107.312V99.8H75.6168V107.2C75.6168 107.547 75.6194 107.851 75.6248 108.112C75.6354 108.373 75.6914 108.587 75.7928 108.752C75.9848 109.072 76.2914 109.251 76.7128 109.288C77.1341 109.325 77.6141 109.304 78.1528 109.224V110.84ZM72.1288 103.712V102.2H78.1528V103.712H72.1288ZM83.5011 111.08C82.6265 111.08 81.8585 110.891 81.1971 110.512C80.5358 110.133 80.0185 109.608 79.6451 108.936C79.2771 108.264 79.0931 107.491 79.0931 106.616C79.0931 105.672 79.2745 104.853 79.6371 104.16C79.9998 103.461 80.5038 102.92 81.1491 102.536C81.7945 102.152 82.5411 101.96 83.3891 101.96C84.2851 101.96 85.0451 102.171 85.6691 102.592C86.2985 103.008 86.7651 103.597 87.0691 104.36C87.3731 105.123 87.4878 106.021 87.4131 107.056H85.5011V106.352C85.4958 105.413 85.3305 104.728 85.0051 104.296C84.6798 103.864 84.1678 103.648 83.4691 103.648C82.6798 103.648 82.0931 103.893 81.7091 104.384C81.3251 104.869 81.1331 105.581 81.1331 106.52C81.1331 107.395 81.3251 108.072 81.7091 108.552C82.0931 109.032 82.6531 109.272 83.3891 109.272C83.8638 109.272 84.2718 109.168 84.6131 108.96C84.9598 108.747 85.2265 108.44 85.4131 108.04L87.3171 108.616C86.9865 109.395 86.4745 110 85.7811 110.432C85.0931 110.864 84.3331 111.08 83.5011 111.08ZM80.5251 107.056V105.6H86.4691V107.056H80.5251ZM92.6621 111.08C91.8675 111.08 91.1741 110.88 90.5821 110.48C89.9901 110.08 89.5315 109.536 89.2061 108.848C88.8808 108.16 88.7181 107.384 88.7181 106.52C88.7181 105.645 88.8808 104.867 89.2061 104.184C89.5368 103.496 90.0035 102.955 90.6061 102.56C91.2088 102.16 91.9181 101.96 92.7341 101.96C93.5555 101.96 94.2435 102.16 94.7981 102.56C95.3581 102.955 95.7821 103.496 96.0701 104.184C96.3581 104.872 96.5021 105.651 96.5021 106.52C96.5021 107.379 96.3581 108.155 96.0701 108.848C95.7821 109.536 95.3528 110.08 94.7821 110.48C94.2115 110.88 93.5048 111.08 92.6621 111.08ZM92.9581 109.352C93.4755 109.352 93.8915 109.235 94.2061 109C94.5261 108.76 94.7581 108.427 94.9021 108C95.0515 107.573 95.1261 107.08 95.1261 106.52C95.1261 105.955 95.0515 105.461 94.9021 105.04C94.7581 104.613 94.5315 104.283 94.2221 104.048C93.9128 103.808 93.5128 103.688 93.0221 103.688C92.5048 103.688 92.0781 103.816 91.7421 104.072C91.4061 104.323 91.1581 104.664 90.9981 105.096C90.8381 105.523 90.7581 105.997 90.7581 106.52C90.7581 107.048 90.8355 107.528 90.9901 107.96C91.1501 108.387 91.3928 108.725 91.7181 108.976C92.0435 109.227 92.4568 109.352 92.9581 109.352ZM95.1261 110.84V104.776H94.8861V99.32H96.8301V110.84H95.1261Z"
          fill="#707DF7"
        />
        <path
          d="M68 78.88C83.0221 78.88 95.2 66.7021 95.2 51.68C95.2 36.6578 83.0221 24.48 68 24.48C52.9779 24.48 40.8 36.6578 40.8 51.68C40.8 66.7021 52.9779 78.88 68 78.88Z"
          stroke="#707DF7"
          stroke-width="4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M79.5328 40.1472L73.7664 57.4464L56.4672 63.2128L62.2336 45.9136L79.5328 40.1472Z"
          stroke="#707DF7"
          stroke-width="4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <defs>
          <filter
            id="filter0_b_241_53"
            x="-20"
            y="-20"
            width="176"
            height="176"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feGaussianBlur in="BackgroundImage" stdDeviation="10" />
            <feComposite
              in2="SourceAlpha"
              operator="in"
              result="effect1_backgroundBlur_241_53"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_backgroundBlur_241_53"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    </div>
  );
}