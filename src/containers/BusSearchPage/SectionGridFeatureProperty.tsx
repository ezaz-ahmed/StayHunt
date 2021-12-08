import { FC, ReactNode } from "react";
import { StayDataType } from "data/types";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import PropertyCardBus from "./PropertyCardBus";
import BusReturnDateProperty from "./BusReturnDatePropertyCard";

import { useAppSelector } from "app/hook";
import PropertyCardLaunch from "./PropertyCardLaunch";
import LaunchReturnProperty from "./LaunchReturnProperty";

export interface SectionGridFeaturePropertyProps {
  variant: "Bus" | "Launch";
  stayListings?: StayDataType[];
  gridClass?: string;
  heading?: ReactNode;
  subHeading?: ReactNode;
  headingIsCenter?: boolean;
  tabs?: string[];
}

const SectionGridFeatureProperty: FC<SectionGridFeaturePropertyProps> = ({
  gridClass = "",
  variant,
}) => {
  const { busList, busUserInput } = useAppSelector((state) => state.bus);
  const { launchList, launchUserInput } = useAppSelector(
    (state) => state.launch
  );

  const renderCardClick = (oneBus: any, index: number) => {
    // If Roundtrip false then -> Bus
    return <PropertyCardBus key={index} className="h-full" data={oneBus} />;
  };

  const renderCard = (oneBus: any, index: number) => {
    // If Roundtrip true then -> Bus
    return (
      <BusReturnDateProperty key={index} className="h-full" data={oneBus} />
    );
  };

  const renderCardLaunch = (oneLaunch: any, index: number) => {
    // If Roundtrip false then -> Launch
    return (
      <PropertyCardLaunch key={index} className="h-full" data={oneLaunch} />
    );
  };

  const renderCardWideLaunch = (oneLaunch: any, index: number) => {
    // If Roundtrip true then -> Launch
    return (
      <LaunchReturnProperty key={index} className="h-full" data={oneLaunch} />
    );
  };

  return (
    <div className="nc-SectionGridFeatureProperty relative">
      {variant === "Bus" &&
        (busUserInput?.roundTrip ? (
          <div className={`grid gap-6 w-100% grid-cols-1 ${gridClass}`}>
            {busList.bus && busList.bus.map(renderCard)}
          </div>
        ) : (
          <div
            className={`grid gap-6 md:gap-8 grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 ${gridClass}`}
          >
            {busList.bus && busList.bus.map(renderCardClick)}
          </div>
        ))}

      {variant === "Launch" &&
        (launchUserInput?.roundTrip ? (
          <div className={`grid gap-6 w-100% grid-cols-1 ${gridClass}`}>
            {launchList.launches &&
              launchList.launches.map(renderCardWideLaunch)}
          </div>
        ) : (
          <div
            className={`grid gap-6 md:gap-8 grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 ${gridClass}`}
          >
            {launchList.launches && launchList.launches.map(renderCardLaunch)}
          </div>
        ))}

      <div className="flex mt-16 justify-center items-center">
        <ButtonPrimary>Show me more</ButtonPrimary>
      </div>
    </div>
  );
};

export default SectionGridFeatureProperty;
