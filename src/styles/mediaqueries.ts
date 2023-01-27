import { css } from "styled-components";

const deviceSizes = {
  mobile: 420,
  tablet: 768,
  laptop: 1024,
  desktop: 2560,
};

export const mediaQueries = (
  Object.keys(deviceSizes) as Array<keyof typeof deviceSizes>
).reduce((acc, label) => {
  acc[label] = (style: String) =>
    `@media (max-width: ${deviceSizes[label]}px) {${style}}`;
  return acc;
}, {} as { [index: string]: Function });
