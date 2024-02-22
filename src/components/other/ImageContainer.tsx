import Image from "next/image";

export const ImageContainer = (props: {
  isMobile: boolean;
  src: string;
  width: number;
  alt: string;
}) => (
  <div
    style={{
      display: "flex",
      overflowX: props.isMobile ? "scroll" : "hidden",
      width: props.isMobile ? "100%" : "auto",
    }}
  >
    <Image src={props.src} width={props.width} height={-1} alt={props.alt} />
  </div>
);
