import { FC, Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Dialog, Transition, Listbox } from "@headlessui/react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { useAppDispatch, useAppSelector } from "app/hook";
import {
  fetchSingleLaunchlAsync,
  fetchLaunchListAsync,
  addInputFirstLaunch,
  addInputSecendLaunch,
} from "app/feature/launch/launchSlice";
import useWindowSize from "hooks/useWindowResize";
import ButtonClose from "shared/ButtonClose/ButtonClose";
import LauchCardH from "containers/BusSearchPage/LaunchCardH";
import BusDateSingleInput from "components/HeroSearchForm/BusDateSingleInput";
import { DateRage } from "components/HeroSearchForm/BusSearchForm";

import moment from "moment";

export interface ModalPhotosProps {
  isOpen: boolean;
  onClose: () => void;
  initFocus: string;
  contentExtraClass?: string;
  contentPaddingClass?: string;
}

const ModalLaunch: FC<ModalPhotosProps> = ({
  isOpen,
  onClose,
  initFocus,
  contentExtraClass = "max-w-screen-xl",
  contentPaddingClass = "py-4 px-6 md:py-5",
}) => {
  const { launchUserInput, status, oneLaunch, firstLaunchSelected } =
    useAppSelector((state) => state.launch);
  const dispatch = useAppDispatch();
  const history = useHistory();

  const [boardingPoint, setBoardingPoint] = useState(
    oneLaunch?.boardingPoints[0]
  );
  const [droppingPoint, setDroppingPoint] = useState(
    oneLaunch?.droppingPoints[0]
  );

  const [selectedDate, setSelectedDate] = useState<DateRage>({
    startDate: launchUserInput?.journeyDate
      ? moment(launchUserInput.journeyDate)
      : moment().add(1, "days"),
    endDate: launchUserInput?.returnDate
      ? moment(launchUserInput.returnDate)
      : moment().add(3, "days"),
  });

  const [selectedCabin, setSelectedCabin] = useState(0);

  const windowSize = useWindowSize();

  useEffect(() => {
    firstLaunchSelected
      ? dispatch<any>(
          fetchSingleLaunchlAsync({
            id: initFocus,
            depDate: launchUserInput?.returnDate,
            fromLocId: launchUserInput?.toCity.locId,
            toLocId: launchUserInput?.fromCity.locId,
          })
        )
      : dispatch<any>(
          fetchSingleLaunchlAsync({
            id: initFocus,
            depDate: launchUserInput?.journeyDate,
            fromLocId: launchUserInput?.fromCity.locId,
            toLocId: launchUserInput?.toCity.locId,
          })
        );
  }, [firstLaunchSelected]);

  const reserveBtnClick = () => {
    if (firstLaunchSelected) {
      // For Return Trip Data Set
      dispatch<any>(
        addInputSecendLaunch({
          launch: oneLaunch._id,
          cabin: oneLaunch.cabins[selectedCabin]._id,
          numOfCabins: 1,
          amount: oneLaunch.cabins[selectedCabin].price,
          adults: oneLaunch.cabins[selectedCabin].maxAdults,
          children: oneLaunch.cabins[selectedCabin].maxChildrens,
          startingPoint: launchUserInput?.toCity,
          endingPoint: launchUserInput?.fromCity,
          depDate: oneLaunch.depDate,
          depTime: oneLaunch.depTime,
          arrTime: oneLaunch.arrTime,
          boardingPoint: boardingPoint,
          droppingPoint: droppingPoint,
        })
      );

      history.push("launch/roundtrip-checkout");
    } else {
      // For First Input Trip Data Set
      dispatch<any>(
        addInputFirstLaunch({
          launch: oneLaunch._id,
          cabin: oneLaunch.cabins[selectedCabin]._id,
          numOfCabins: 1,
          amount: oneLaunch.cabins[selectedCabin].price,
          adults: oneLaunch.cabins[selectedCabin].maxAdults,
          children: oneLaunch.cabins[selectedCabin].maxChildrens,
          startingPoint: launchUserInput?.fromCity,
          endingPoint: launchUserInput?.toCity,
          depDate: oneLaunch.depDate,
          depTime: oneLaunch.depTime,
          arrTime: oneLaunch.arrTime,
          boardingPoint: boardingPoint,
          droppingPoint: droppingPoint,
        })
      );

      dispatch<any>(
        fetchLaunchListAsync({
          fromCityId: launchUserInput?.toCity.locId,
          toCityId: launchUserInput?.fromCity.locId,
          depDate: launchUserInput?.returnDate,
        })
      );
      onClose();
    }
  };

  const renderBoardingPoint = () => {
    return (
      <Listbox value={boardingPoint} onChange={setBoardingPoint}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
            <span className="block truncate">{boardingPoint}</span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <i className="las la-angle-down"></i>
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute w-full py-1 mt-1 z-50 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {oneLaunch.boardingPoints.map((brdPoint: any, brdIdx: any) => (
                <Listbox.Option
                  key={brdIdx}
                  className={({ active }) =>
                    `${active ? "text-amber-900 bg-amber-100" : "text-gray-900"}
            cursor-default select-none relative py-2 pl-10 pr-4`
                  }
                  value={brdPoint}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`${
                          selected ? "font-medium" : "font-normal"
                        } block truncate`}
                      >
                        {brdPoint}
                      </span>
                      {selected ? (
                        <span
                          className={`${
                            active ? "text-amber-600" : "text-amber-600"
                          }
                  absolute inset-y-0 left-0 flex items-center pl-3`}
                        >
                          <i className="las la-check"></i>
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    );
  };

  const renderDroppingPoint = () => {
    return (
      <Listbox value={droppingPoint} onChange={setDroppingPoint}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
            <span className="block truncate">{droppingPoint}</span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <i className="las la-angle-down"></i>
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {oneLaunch.droppingPoints.map((drpPoint: any, drpIndex: any) => (
                <Listbox.Option
                  key={drpIndex}
                  className={({ active }) =>
                    `${active ? "text-amber-900 bg-amber-100" : "text-gray-900"}
            cursor-default select-none relative py-2 pl-10 pr-4`
                  }
                  value={drpPoint}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`${
                          selected ? "font-medium" : "font-normal"
                        } block truncate`}
                      >
                        {drpPoint}
                      </span>
                      {selected ? (
                        <span
                          className={`${
                            active ? "text-amber-600" : "text-amber-600"
                          }
                  absolute inset-y-0 left-0 flex items-center pl-3`}
                        >
                          <i className="las la-check"></i>
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    );
  };

  const renderSection1 = () => {
    return oneLaunch ? (
      <div className="!space-y-6 mb-10">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
          {oneLaunch.name}
        </h2>

        <div className="flex items-center space-x-4">
          <span>
            <i className="las la-sync"></i>
            <span className="ml-1">{oneLaunch.companyName}</span>
          </span>

          <span>·</span>

          <span>
            <span className="ml-1">
              {oneLaunch.startingPoint} to {oneLaunch.endingPoint}
            </span>
          </span>
        </div>

        <div className="w-full border-b border-neutral-100 dark:border-neutral-700 py-1" />

        <h2 className="text-2xl font-semibold">Launch information</h2>

        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

        <div className="text-neutral-6000 dark:text-neutral-300">
          {oneLaunch.description}
        </div>

        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

        <div className="flex">
          <div className="w-auto pr-20">
            <span className="text-lg font-semibold">
              Select your boarding point
            </span>
            <div>{renderBoardingPoint()}</div>
          </div>

          <div className="w-auto pl-20">
            <span className="text-lg font-semibold">
              Select your dropping point
            </span>
            <div>{renderDroppingPoint()}</div>
          </div>
        </div>
      </div>
    ) : (
      <Fragment></Fragment>
    );
  };

  const renderCabin = () => {
    return (
      <div className="!space-y-6 shadow-xl mb-10">
        <div className="w-full border-b border-neutral-100 dark:border-neutral-700 py-1" />
        <h2 className="text-2xl font-semibold">Select Your Room</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

        {oneLaunch?.cabins.map((item: any, index: any) => (
          <div key={item._id}>
            <LauchCardH
              index={index}
              data={item}
              selected={selectedCabin}
              onSelectedChange={setSelectedCabin}
            />
          </div>
        ))}
      </div>
    );
  };

  const renderSection2 = () => {
    return (
      <div className="!space-y-6">
        <div className="w-full border-b border-neutral-100 dark:border-neutral-700 py-1" />
        <h4 className="text-lg font-semibold">Cancellation policy</h4>
        <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
          Refund 50% of the booking value when customers cancel the room within
          48 hours after successful booking and 14 days before the check-in
          time. <br />
          Then, cancel the room 14 days before the check-in time, get a 50%
          refund of the total amount paid (minus the service fee).
        </span>
      </div>
    );
  };

  const renderSidebar = () => {
    return (
      <div className="listingSection__wrap shadow-xl sticky">
        <span className="font-semibold text-3xl">
          {oneLaunch?.cabins[selectedCabin].type}
        </span>
        <div className="flex justify-between">
          <div className="flex justify-between">
            <span className="text-2xl">
              BDT {oneLaunch?.cabins[selectedCabin].price}.00
            </span>
          </div>
        </div>

        {/* FORM */}
        <form className="flex justify-center align-middle border divide-x divide-neutral-200 dark:divide-neutral-700 border-neutral-200 dark:border-neutral-700 rounded-3xl ">
          <div className="flex-1">
            <BusDateSingleInput
              defaultValue={selectedDate.startDate}
              onFocusChange={() => {}}
              onChange={(date) =>
                setSelectedDate({ startDate: date, endDate: null })
              }
              dateFormat="DD-MMM"
              anchorDirection={windowSize.width > 1400 ? "left" : "right"}
              fieldClassName="p-4"
            />
          </div>

          <div className="flex-1 grid place-items-center">
            <span className="text-center text-lg font-semibold">
              Max {oneLaunch.cabins[selectedCabin].maxAdults} People
            </span>
          </div>
        </form>

        <div className="flex flex-col space-y-4">
          <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
            <span>Boarding Point</span>
            <div className="w-max">{boardingPoint}</div>
          </div>

          <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
            <span>Dropping Point</span>
            <div className="w-max">{droppingPoint}</div>
          </div>
        </div>

        <ButtonPrimary onClick={reserveBtnClick}>Book Now</ButtonPrimary>
      </div>
    );
  };

  const renderContent = () => {
    return status === "loading" ? (
      <div>Loading....</div>
    ) : (
      <main className="w-full flex">
        <div className="w-1/ px-5">
          {renderSection1()}
          {renderCabin()}
          {renderSection2()}
        </div>

        <div className="w-1/2 px-5">{renderSidebar()}</div>
      </main>
    );
  };

  return (
    <div className="nc-NcModal">
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={onClose}
        >
          <div className="min-h-screen px-1 text-center md:px-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-white dark:bg-neutral-800" />
            </Transition.Child>
            {/* This element is to trick the browser into centering the modal contents.  */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-75"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-75"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div
                className={`inline-block w-full my-5 overflow-hidden text-left align-middle transition-all transform bg-white border border-black border-opacity-5 shadow-xl rounded-2xl sm:my-8 dark:bg-neutral-800 dark:border-neutral-700 text-neutral-900 dark:text-neutral-300 ${contentExtraClass}`}
              >
                <div className="py-4 px-6 text-center relative border-b border-neutral-100 dark:border-neutral-700 md:py-5">
                  <ButtonClose
                    onClick={onClose}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 sm:left-4"
                  />

                  <Dialog.Title
                    as="h3"
                    className="text-base font-semibold text-neutral-900 lg:text-xl dark:text-neutral-200 mx-10"
                  >
                    {firstLaunchSelected
                      ? `Please! Select Launch Cabin For ${launchUserInput?.toCity.locName} to ${launchUserInput?.fromCity.locName}`
                      : `Please! Select Launch Cabin For ${launchUserInput?.fromCity.locName} to ${launchUserInput?.toCity.locName}`}
                  </Dialog.Title>
                </div>

                <div className={contentPaddingClass}>{renderContent()}</div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default ModalLaunch;
