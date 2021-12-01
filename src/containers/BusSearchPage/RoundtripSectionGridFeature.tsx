import { Fragment } from "react";
import { useAppSelector } from "app/hook";
import moment from "moment";
import SectionGridFeatureProperty from "./SectionGridFeatureProperty";

const RoundtripSectionGridFeature = () => {
  const { inputFirstBus } = useAppSelector((state) => state.bus);

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
                    {moment(inputFirstBus?.depDate).format("MMMM d, YYYY")}
                  </span>
                  <span className=" font-semibold">
                    {inputFirstBus.busName}{" "}
                    {JSON.stringify(inputFirstBus.seats)}
                  </span>
                </Fragment>
              ) : (
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
        <div className="hidden lg:block flex-grow">{renderSidebarDetail()}</div>
      </main>
    </div>
  );
};

export default RoundtripSectionGridFeature;
