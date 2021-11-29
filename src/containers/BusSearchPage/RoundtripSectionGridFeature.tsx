import { Fragment, useState } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import BusDatesRangeInput from "components/HeroSearchForm/BusDatesRangeInput";
import { DateRage } from "components/HeroSearchForm/BusSearchForm";
import { useAppSelector } from "app/hook";
import moment from "moment";
import SectionGridFeatureProperty from "./SectionGridFeatureProperty";

const RoundtripSectionGridFeature = () => {
  const { busUserInput, inputFirstBus } = useAppSelector((state) => state.bus);

  const [dateRangeValue, setDateRangeValue] = useState<DateRage>({
    startDate: busUserInput?.journeyDate
      ? moment(busUserInput.returnDate)
      : null,
    endDate: busUserInput?.returnDate ? moment(busUserInput.returnDate) : null,
  });

  const renderSidebarDetail = () => {
    return (
      <div className="listingSection__wrap shadow-xl">
        <span className="text-2xl font-semibold block">
          Journey & Return Details
        </span>
        <div className="mt-8 flex">
          <div className="flex-shrink-0 flex flex-col items-center py-2">
            <span className="block w-6 h-6 rounded-full border border-neutral-400"></span>
            <span className="block flex-grow border-l border-neutral-400 border-dashed my-1"></span>
            <span className="block w-6 h-6 rounded-full border border-neutral-400"></span>
          </div>
          <div className="ml-4 space-y-14 text-sm">
            <div className="flex flex-col space-y-2">
              {inputFirstBus ? (
                <Fragment>
                  <span className=" text-neutral-500 dark:text-neutral-400">
                    Select A Bus For Journey
                  </span>
                  <span className=" font-semibold">No Bus Is Selected</span>{" "}
                </Fragment>
              ) : (
                // <Fragment>
                //   <span className=" text-neutral-500 dark:text-neutral-400">
                //     {moment(inputFirstBus?.depDate, "DD-MM-YYYY")}
                //   </span>
                //   <span className=" font-semibold">
                //     Saint Petersburg City Center
                //   </span>{" "}
                // </Fragment>
                <Fragment>
                  <span className=" text-neutral-500 dark:text-neutral-400">
                    Select A Bus For Journey
                  </span>
                  <span className=" font-semibold">No Bus Is Selected</span>{" "}
                </Fragment>
              )}
            </div>
            <div className="flex flex-col space-y-2">
              <span className=" text-neutral-500 dark:text-neutral-400">
                Monday, August 16 · 10:00
              </span>
              <span className=" font-semibold">
                Saint Petersburg City Center
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderSection = () => {
    return <SectionGridFeatureProperty />;
  };

  const renderSidebarPrice = () => {
    return (
      <div className="listingSection__wrap shadow-xl">
        <div className="flex justify-between">
          <span className="text-3xl font-semibold">
            $19
            <span className="ml-1 text-base font-normal text-neutral-500 dark:text-neutral-400">
              /day
            </span>
          </span>
        </div>

        <form className="flex flex-col border border-neutral-200 dark:border-neutral-700 rounded-3xl ">
          <BusDatesRangeInput
            wrapFieldClassName="divide-x divide-neutral-200 dark:divide-neutral-700"
            numberOfMonths={1}
            fieldClassName="p-5"
            defaultDateValue={dateRangeValue}
            onChange={(data) => setDateRangeValue(data)}
          />
        </form>

        <div className="flex flex-col space-y-4 ">
          <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
            <span>$19 x 3 day</span>
            <span>$57</span>
          </div>

          <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>$199</span>
          </div>
        </div>

        <ButtonPrimary>Book Now</ButtonPrimary>
      </div>
    );
  };

  return (
    <div
      className={`nc-ListingStayDetailPage pb-20`}
      data-nc-id="ListingStayDetailPage"
    >
      <main className="mt-11 flex ">
        {/* CONTENT */}
        <div className="w-full lg:w-3/5 xl:w-2/3 space-y-8 lg:pr-10 lg:space-y-10">
          {renderSection()}
        </div>

        {/* SIDEBAR */}
        <div className="hidden lg:block flex-grow">
          {renderSidebarDetail()}
          <div className="mt-10 sticky top-24">{renderSidebarPrice()}</div>
        </div>
      </main>
    </div>
  );
};

export default RoundtripSectionGridFeature;
