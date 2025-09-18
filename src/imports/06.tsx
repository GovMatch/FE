import imgPutArtworkHere from "figma:asset/6c0776333f9662c091ea977deb790dc4aedaabbe.png";
import { imgGroup47242, imgGroup47243 } from "./svg-gjy2d";

function Group47242() {
  return (
    <div className="absolute h-[690.996px] left-0 top-0 w-[1204px]">
      <img className="block max-w-none size-full" src={imgGroup47242} alt="그룹 이미지" />
    </div>
  );
}

function Group47243() {
  return (
    <div className="absolute inset-[8.97%_1.98%_23.75%_88.45%]">
      <div className="absolute inset-[-0.43%_-1.73%]">
        <img className="block max-w-none size-full" src={imgGroup47243} alt="그룹 이미지" />
      </div>
    </div>
  );
}

export default function Component06() {
  return (
    <div className="relative size-full" data-name="06">
      <Group47242 />
      <Group47243 />
      <div className="absolute flex h-[670.589px] items-center justify-center left-[0.17px] top-[5px] w-[1187.952px]">
        <div className="flex-none skew-x-[346.639deg]">
          <div className="bg-center bg-cover bg-no-repeat h-[690.346px] rounded-bl-[26px] rounded-br-[15px] rounded-tl-[15px] rounded-tr-[26px] w-[1024px]" data-name="PUT ARTWORK HERE" style={{ backgroundImage: `url('${imgPutArtworkHere}')` }} />
        </div>
      </div>
    </div>
  );
}