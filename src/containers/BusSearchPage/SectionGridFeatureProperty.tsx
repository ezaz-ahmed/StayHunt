import { FC, ReactNode } from "react";
import { StayDataType } from "data/types";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import PropertyCardH from "./PropertyCardH";
import BusReturnDateProperty from "./BusReturnDatePropertyCard";

import { useAppSelector } from "app/hook";

export interface SectionGridFeaturePropertyProps {
  stayListings?: StayDataType[];
  gridClass?: string;
  heading?: ReactNode;
  subHeading?: ReactNode;
  headingIsCenter?: boolean;
  tabs?: string[];
}

const SectionGridFeatureProperty: FC<SectionGridFeaturePropertyProps> = ({
  gridClass = "",
}) => {
  const { busList, busUserInput } = useAppSelector((state) => state.bus);

  const renderCardClick = (oneBus: any, index: number) => {
    return <PropertyCardH key={index} className="h-full" data={oneBus} />;
  };

  const renderCard = (oneBus: any, index: number) => {
    return (
      <BusReturnDateProperty key={index} className="h-full" data={oneBus} />
    );
  };

  return (
    <div className="nc-SectionGridFeatureProperty relative">
      {busUserInput?.roundTrip ? (
        <div className={`grid gap-6 w-100% grid-cols-1 ${gridClass}`}>
          {busList.bus && busList.bus.map(renderCard)}
        </div>
      ) : (
        <div
          className={`grid gap-6 md:gap-8 grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 ${gridClass}`}
        >
          {busList.bus && busList.bus.map(renderCardClick)}
        </div>
      )}

      <div className="flex mt-16 justify-center items-center">
        <ButtonPrimary>Show me more</ButtonPrimary>
      </div>
    </div>
  );
};

export default SectionGridFeatureProperty;
