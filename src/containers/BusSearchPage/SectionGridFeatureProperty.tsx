import { FC, ReactNode } from "react";
import { DEMO_STAY_LISTINGS } from "data/listings";
import { StayDataType } from "data/types";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import PropertyCardH from "./PropertyCardH";

import { useAppSelector } from "app/hook";

// OTHER DEMO WILL PASS PROPS
const DEMO_DATA: StayDataType[] = DEMO_STAY_LISTINGS.filter((_, i) => i < 8);
//
export interface SectionGridFeaturePropertyProps {
  stayListings?: StayDataType[];
  gridClass?: string;
  heading?: ReactNode;
  subHeading?: ReactNode;
  headingIsCenter?: boolean;
  tabs?: string[];
}

const SectionGridFeatureProperty: FC<SectionGridFeaturePropertyProps> = ({
  stayListings = DEMO_DATA,
  gridClass = "",
  heading = "Featured places to stay",
  subHeading = "Popular places to stay that Chisfis recommends for you",
  headingIsCenter,
}) => {
  const { busList, busUserInput } = useAppSelector((state) => state.bus);

  const renderCard = (oneBus: any, index: number) => {
    return <PropertyCardH key={index} className="h-full" data={oneBus} />;
  };

  return (
    <div className="nc-SectionGridFeatureProperty relative">
      {busUserInput?.roundTrip ? (
        <div
          className={`grid gap-6 md:gap-8 grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 ${gridClass}`}
        >
          {DEMO_DATA.map(renderCard)}
        </div>
      ) : (
        <div
          className={`grid gap-6 md:gap-8 grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 ${gridClass}`}
        >
          {busList.bus && busList.bus.map(renderCard)}
        </div>
      )}

      <div className="flex mt-16 justify-center items-center">
        <ButtonPrimary>Show me more</ButtonPrimary>
      </div>
    </div>
  );
};

export default SectionGridFeatureProperty;
