import ButtonPrimary from "shared/Button/ButtonPrimary";
import NcImage from "shared/NcImage/NcImage";
import SomethingWrongImg from "images/SomethingWrong.png";

const SomethingWrong = () => (
  <div className="nc-Page404">
    <div className="container relative pt-5 pb-16 lg:pb-20 lg:pt-5">
      <header className="text-center max-w-2xl mx-auto space-y-2 my-24">
        <NcImage src={SomethingWrongImg} />
        <span className="block text-sm text-neutral-800 sm:text-base dark:text-neutral-200 tracking-wider font-medium">
          SOMETHING WENT WRONG.{" "}
        </span>
        <div className="pt-8">
          <ButtonPrimary href="/">Return Home Page</ButtonPrimary>
        </div>
      </header>
    </div>
  </div>
);

export default SomethingWrong;
