import { FC } from "react";
import HotelCard from "components/HotelCard/HotelCard";
import { StayDataType } from "data/types";
import Heading2 from "components/Heading/Heading2";

import { useAppSelector } from "app/hook";

export interface SectionGridFilterCardProps {
  className?: string;
  data?: StayDataType[];
  heading?: string;
}

const SectionGridFilterCard: FC<SectionGridFilterCardProps> = ({
  className = "",
  heading,
}) => {
  const { allHotelList } = useAppSelector((state) => state.hotel);

  return (
    <div
      className={`nc-SectionGridFilterCard ${className}`}
      data-nc-id="SectionGridFilterCard"
    >
      <Heading2 heading={heading} />

      {/* Tab Filter Was Here */}

      <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {allHotelList?.map((hotel) => (
          <HotelCard key={hotel._id} data={hotel} />
        ))}
      </div>

      {/* Pagination Filter Was Here */}
    </div>
  );
};

export default SectionGridFilterCard;
