import React from 'react'

const VizdaleLogo = () => {
  return (
    <svg
            width="152"
            height="44"
            viewBox="0 0 152 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          > 
            <mask
              id="mask0_1_9336"
              style={{ maskType: "alpha" }}
              maskUnits="userSpaceOnUse"
              x="10"
              y="10"
              width="132"
              height="24"
            >
              <rect
                x="10"
                y="10"
                width="132"
                height="24"
                fill="url(#pattern0_1_9336)"
              />
            </mask>
            <g mask="url(#mask0_1_9336)">
              <rect x="10" y="10" width="132" height="24" fill="#212121" />
            </g>
            <defs>
              <pattern
                id="pattern0_1_9336"
                patternContentUnits="objectBoundingBox"
                width="1"
                height="1"
              >
                <use
                  href="#image0_1_9336"
                  transform="matrix(0.00626959 0 0 0.0344828 -0.0015674 0)"
                />
              </pattern>
              <image
                id="image0_1_9336"
                width="160"
                height="29"
                href="data:image/png;base64,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"
              />
            </defs>
          </svg>
  )
}

export default VizdaleLogo