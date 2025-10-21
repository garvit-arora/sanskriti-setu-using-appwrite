declare module '*.css';
declare module '*.scss';
declare module '*.sass';
declare module '*.less';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.webp';
declare module '*.gif';
declare module '*.svg' {
  import * as React from 'react';
  const content: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  export default content;
}
