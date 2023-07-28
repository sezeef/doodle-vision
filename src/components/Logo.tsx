import Image from "next/image";

type Props = {
  className?: string;
  width: number;
  height: number;
};

export default function Logo({ className, width, height }: Props) {
  return (
    <Image
      src={"/Cute-Eye_circle-cropped_512.png"}
      alt="Doodle Vision Logo"
      width={width}
      height={height}
      priority={true}
      className={className}
    />
  );
}
