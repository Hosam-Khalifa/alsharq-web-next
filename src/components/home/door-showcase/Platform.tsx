import Image from "next/image";
import { DOOR_SHOWCASE_ASSETS } from "./data";
import { platformStyles } from "./styles";

export function Platform() {
  return (
    <div className={platformStyles.root} aria-hidden="true">
      <div className={platformStyles.shadow} />
      <div className={platformStyles.imageWrap}>
        <Image
          src={DOOR_SHOWCASE_ASSETS.platform}
          alt=""
          width={921}
          height={300}
          className={platformStyles.image}
          sizes="(max-width: 640px) 126vw, (max-width: 1024px) 60vw, 42vw"
        />
      </div>
    </div>
  );
}
