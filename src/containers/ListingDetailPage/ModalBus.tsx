import { FC, Fragment, useEffect, useState } from "react";
import { Dialog, Transition, Listbox } from "@headlessui/react";
import ButtonClose from "shared/ButtonClose/ButtonClose";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { useAppDispatch, useAppSelector } from "app/hook";
import { fetchSingleBuslAsync } from "app/feature/bus/busSlice";
import Badge from "shared/Badge/Badge";

export interface ModalPhotosProps {
  isOpen: boolean;
  onClose: () => void;
  initFocus: string;
  contentExtraClass?: string;
  contentPaddingClass?: string;
}

const ModalBus: FC<ModalPhotosProps> = ({
  isOpen,
  onClose,
  initFocus,
  contentExtraClass = "max-w-screen-xl",
  contentPaddingClass = "py-4 px-6 md:py-5",
}) => {
  const { busUserInput, status, oneBus } = useAppSelector((state) => state.bus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch<any>(
      fetchSingleBuslAsync({
        id: initFocus,
        depDate: busUserInput?.journeyDate,
        fromLocId: busUserInput?.fromCity.locId,
        toLocId: busUserInput?.toCity.locId,
      })
    );
  }, []);

  const [selectedSeat, setSelectedSeat] = useState<string[]>([]);
  const [boardingPoint, setBoardingPoint] = useState(oneBus?.boardingPoints[0]);
  const [droppingPoint, setDroppingPoint] = useState(oneBus?.droppingPoints[0]);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [errorNoSeat, setErrorNoSeat] = useState<string>();

  let busSeats: any;
  let threeSitter: any;

  let seatCount = selectedSeat.length;
  let changableAmount = 0;
  let vat = 0;
  let totalAmount = 0;
  let serviceCharge = 0;

  if (seatCount !== 0) {
    serviceCharge = 50;
  }

  if (oneBus) {
    changableAmount = oneBus.fare * seatCount;
    vat = changableAmount * 0.15;
    totalAmount = Math.ceil(changableAmount + serviceCharge + vat);
    threeSitter = oneBus.seatsInOneRow === 3 ? true : false;
    busSeats = oneBus.seats.map((el: string) => ({
      key: el,
      selected: oneBus.bookedSeats.includes(el),
    }));
  }

  const handleSeatSelect = (ev: any) => {
    const value: string = ev.target.value;

    if (selectedSeat.includes(value)) {
      setErrorMessage("");
      setSelectedSeat(selectedSeat.filter((seat) => seat !== value));
    } else {
      if (seatCount < 4) {
        setErrorNoSeat("");
        setSelectedSeat((arr) => [...arr, value]);
      } else {
        ev.target.checked = false;
        setErrorMessage("Maximum 4 Seat can be selected!");
      }
    }
  };

  const reserveBtnClick = () => {
    if (seatCount > 0) {
      console.log(selectedSeat, "😢😢");
    } else {
      setErrorNoSeat("You've to select at least one seat to continue!");
    }
  };

  const renderSeat = (seat: any) => {
    return (
      <li
        className={`seat p-1 relative justify-center my-1   ${
          threeSitter
            ? seat.key.slice(-1) === "2" && "ml-12"
            : (seat.key.slice(-1) === "2" && "mr-5") ||
              (seat.key.slice(-1) === "3" && "ml-5")
        }`}
        key={seat.key}
      >
        <input
          type="checkbox"
          disabled={seat.selected}
          id={seat.key}
          value={seat.key}
          readOnly={selectedSeat.includes(seat.key)}
          onClick={handleSeatSelect}
        />
        <label
          className={`${seatCount > 4 ? "bg-gray-200" : true}`}
          htmlFor={seat.key}
        >
          {seat.selected ? "X" : seat.key}
        </label>
      </li>
    );
  };

  const renderBoardingPoint = () => {
    return (
      <Listbox value={boardingPoint} onChange={setBoardingPoint}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full py-4 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
            <span className="block truncate">{boardingPoint}</span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <i className="las la-angle-down"></i>
            </span>
          </Listbox.Button>

          {oneBus.boardingPoints && (
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {oneBus.boardingPoints.map((brdPoint: any, brdIdx: any) => (
                  <Listbox.Option
                    key={brdIdx}
                    className={({ active }) =>
                      `${
                        active ? "text-amber-900 bg-amber-100" : "text-gray-900"
                      }
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
          )}
        </div>
      </Listbox>
    );
  };

  const renderDroppingPoint = () => {
    return (
      <Listbox value={droppingPoint} onChange={setDroppingPoint}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full py-4 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
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
              {oneBus.droppingPoints.map((drpPoint: any, drpIndex: any) => (
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
    return oneBus ? (
      <div className="listingSection__wrap !space-y-6">
        <div className="flex justify-between items-center">
          {oneBus.AC ? (
            <Badge
              name={
                <div className="flex items-center">
                  <i className="text-sm las la-user-friends"></i>
                  <span className="ml-1">AC</span>
                </div>
              }
            />
          ) : (
            <Badge
              color="yellow"
              name={
                <div className="flex items-center">
                  <i className="text-sm las la-user-friends"></i>
                  <span className="ml-1">NON-AC</span>
                </div>
              }
            />
          )}
        </div>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
          {oneBus.name}
        </h2>

        <div className="flex items-center space-x-4">
          <span>
            <i className="las la-fan"></i>
            <span className="ml-1">Model: {oneBus.model}</span>
          </span>

          <span>·</span>

          <span>
            <i className="las la-fan"></i>
            <span className="ml-1">Total seats: {oneBus.numOfSeats}</span>
          </span>
        </div>

        <div className="w-full border-b border-neutral-100 dark:border-neutral-700 py-1" />

        <h2 className="text-2xl font-semibold">Please select a seat</h2>

        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

        <div className="text-neutral-6000 dark:text-neutral-300 flex justify-around">
          <div className="flex-1">
            <span className="text-lg font-semibold">Select your Seats</span>
            <div className="pt-5">
              <div className={`bus ${threeSitter ? "w-72" : "w-80"}`}>
                <ol className={`cabin grid grid-cols-${oneBus.seatsInOneRow}`}>
                  {busSeats.map((el: any) => renderSeat(el))}
                </ol>
              </div>
              <span className="mt-12">{errorMessage}</span>
            </div>
          </div>
          <div className="flex-1 px-5">
            <span className="text-lg font-semibold">
              Select your boarding point
            </span>
            {oneBus.boardingPoints && (
              <div className="py-5">{renderBoardingPoint()}</div>
            )}

            <div className="w-14 border-b border-neutral-200 dark:border-neutral-700 pt-4"></div>

            <div className="pb-4"></div>

            <span className="text-lg font-semibold">
              Select your dropping point
            </span>

            {oneBus.droppingPoints && (
              <div className="pt-5">{renderDroppingPoint()}</div>
            )}
          </div>

          <div className="flex-1 px-5">
            <div className="pt-5">
              <div className="listingSection__wrap shadow-xl">
                <span className="font-semibold text-xl">
                  {oneBus?.busClass} Class
                </span>
                <div className="flex justify-between">
                  <span className="text-2xl font-semibold">
                    BDT {oneBus?.fare}
                    <span className="ml-1 text-base font-normal text-neutral-500 dark:text-neutral-400">
                      /seat
                    </span>
                  </span>
                  <span className="text-2xl font-semibold">
                    {seatCount}
                    <span className="ml-1 text-base font-normal text-neutral-500 dark:text-neutral-400">
                      /{seatCount === 1 ? "seat" : "seats"}
                    </span>
                  </span>
                </div>

                <div className="flex flex-col space-y-4">
                  <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
                    <span>
                      {oneBus?.fare} x {seatCount} seats
                    </span>
                    <span>BDT {changableAmount}</span>
                  </div>

                  <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
                    <span>VAT(15%)</span>
                    <span>BDT {vat}</span>
                  </div>

                  {serviceCharge !== 0 && (
                    <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
                      <span>Service charge</span>
                      <span>BDT {serviceCharge}</span>
                    </div>
                  )}

                  <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>BDT {totalAmount}</span>
                  </div>

                  <ButtonPrimary onClick={reserveBtnClick}>
                    Book Now
                  </ButtonPrimary>

                  <span className="text-base mt-5">{errorNoSeat}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <Fragment></Fragment>
    );
  };

  const renderContent = () => {
    return status === "loading" ? (
      <div>Loading....</div>
    ) : (
      <div>{renderSection1()}</div>
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
                    Please! Select Bus Seats
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

export default ModalBus;
