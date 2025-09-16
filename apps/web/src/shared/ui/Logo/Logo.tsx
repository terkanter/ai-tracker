import { LogoIcon } from "@/shared/icons/logo";
import { IconSvgProps } from "@/shared/types";

interface Props extends IconSvgProps {}

export const Logo = (props: Props) => {
  const { className, size } = props;

  return <LogoIcon className={className} size={size} />;
};
