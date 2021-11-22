import { FC, Fragment, useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { Dialog, Transition, Listbox } from "@headlessui/react";
import moment from "moment";
import { useAppSelector, useAppDispatch } from "app/hook";
import BusDateSingleInput from "components/HeroSearchForm/BusDateSingleInput";
import { DateRage } from "components/HeroSearchForm/StaySearchForm";
import useWindowSize from "hooks/useWindowResize";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import NcImage from "shared/NcImage/NcImage";
import ModalPhotos from "containers/ListingDetailPage/ModalPhotos";
import Badge from "shared/Badge/Badge";
import { fetchSingleBuslAsync, addFinalInput } from "app/feature/bus/busSlice";

interface BusDetailsPageProps {
  match?: any;
}

const BusDetailsPage: FC<BusDetailsPageProps> = ({ match }) => {
  const { busUserInput, oneBus } = useAppSelector((state) => state.bus);
  const { isLogged } = useAppSelector((state) => state.user);
  const history = useHistory();
  const dispatch = useAppDispatch();

  const [selectedSeat, setSelectedSeat] = useState<string[]>([]);
  const [boardingPoint, setBoardingPoint] = useState(oneBus?.boardingPoints[0]);
  const [droppingPoint, setDroppingPoint] = useState(oneBus?.droppingPoints[0]);

  const [isOpen, setIsOpen] = useState(false);
  const [seatWarningIsOpen, setSeatWarningIsOpen] = useState(false);
  const [openFocusIndex, setOpenFocusIndex] = useState(0);

  const [selectedDate, setSelectedDate] = useState<DateRage>({
    startDate: busUserInput?.journeyDate
      ? moment(busUserInput.journeyDate)
      : moment().add(1, "days"),
    endDate: busUserInput?.returnDate
      ? moment(busUserInput.returnDate)
      : moment().add(3, "days"),
  });

  const { id } = match.params;

  let busSeats: any;
  let threeSitter: any;

  if (oneBus) {
    threeSitter = oneBus.seatsInOneRow === 3 ? true : false;
    busSeats = oneBus.seats.map((el: string) => ({
      key: el,
      selected: oneBus.bookedSeats.includes(el),
    }));
  }

  const fetchOneBus = useCallback(() => {
    dispatch<any>(
      fetchSingleBuslAsync({
        id,
        depDate: selectedDate.startDate?.toISOString(),
        fromLocId: busUserInput?.fromCity.locId,
        toLocId: busUserInput?.toCity.locId,
      })
    );
  }, [dispatch]);

  useEffect(() => {
    fetchOneBus();
  }, [id, oneBus]);

  const handleSeatSelect = (ev: any) => {
    const value: string = ev.target.value;

    if (selectedSeat.includes(value)) {
      setSelectedSeat(selectedSeat.filter((seat) => seat !== value));
    } else {
      if (selectedSeat.length < 4) {
        setSelectedSeat((arr) => [...arr, value]);
      } else {
        ev.target.checked = false;
        handleOpenSeatWarning();
      }
    }
  };

  const handleOpenModal = (index: number) => {
    setIsOpen(true);
    setOpenFocusIndex(index);
  };

  const windowSize = useWindowSize();

  const handleCloseModal = () => setIsOpen(false);
  const handleCloseSeatWarning = () => setSeatWarningIsOpen(false);
  const handleOpenSeatWarning = () => setSeatWarningIsOpen(true);

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
  }

  const reserveBtnClick = () => {
    dispatch<any>(
      addFinalInput({
        journey: {
          bus: oneBus._id,
          busName: oneBus.name,
          startingPoint: busUserInput?.fromCity.locId,
          endingPoint: busUserInput?.toCity.locId,
          amont: totalAmount,
          depDate: oneBus.depDate,
          depTime: oneBus.depTime,
          arrTime: oneBus.arrTime,
          seats: selectedSeat,
          seatCount: seatCount,
          boardingPoint: boardingPoint,
          droppingPoint: droppingPoint,
          serviceCharge: serviceCharge,
          amount: changableAmount,
          vat: vat,
          totalAmount: totalAmount,
        },
      })
    );

    if (
      totalAmount !== 0 &&
      selectedDate.startDate !== null &&
      boardingPoint &&
      droppingPoint
    ) {
      if (isLogged) {
        history.push("/bus/checkout");
      } else {
        history.push("/login");
      }
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
          onClick={handleSeatSelect}
        />
        <label
          className={`${selectedSeat.length > 4 ? "bg-gray-200" : true}`}
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
            <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {oneBus.boardingPoints.map((brdPoint: any, brdIdx: any) => (
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

        <div className="text-neutral-6000 dark:text-neutral-300 flex justify-between">
          <div className="flex-1">
            <span className="text-lg font-semibold">Select your Seats</span>
            <div className="pt-5">
              <div className={`bus  ${threeSitter ? "w-72" : "w-80"}`}>
                <ol className={`cabin grid grid-cols-${oneBus.seatsInOneRow}`}>
                  {busSeats.map((el: any) => renderSeat(el))}
                </ol>
              </div>
            </div>
          </div>
          <div className="flex-1 w-72">
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
        </div>
        <Transition appear show={seatWarningIsOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-10 overflow-y-auto"
            onClose={handleCloseSeatWarning}
          >
            <div className="min-h-screen px-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0" />
              </Transition.Child>

              {/* This element is to trick the browser into centering the modal contents. */}
              <span
                className="inline-block h-screen align-middle"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Maximum Four Seat is Available!
                  </Dialog.Title>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                      onClick={handleCloseSeatWarning}
                    >
                      Got it, thanks!
                    </button>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      </div>
    ) : (
      <Fragment></Fragment>
    );
  };

  const renderSidebar = () => {
    return (
      <div className="listingSection__wrap shadow-xl">
        <span className="font-semibold text-3xl">
          Class: {oneBus?.busClass}
        </span>
        <div className="flex justify-between">
          <span className="text-2xl">
            BDT {oneBus?.fare}
            <span className="ml-1 text-base font-normal text-neutral-500 dark:text-neutral-400">
              /seat
            </span>
          </span>
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
              {selectedSeat.length} Seats Selected
            </span>
          </div>
        </form>

        <div className="flex flex-col space-y-4">
          <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
            <span>Boarding Point</span>
            <span>{boardingPoint}</span>
          </div>

          <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
            <span>Dropping Point</span>
            <span>{droppingPoint}</span>
          </div>
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
        </div>

        <ButtonPrimary onClick={reserveBtnClick}>Book Now</ButtonPrimary>
      </div>
    );
  };

  const renderPhotoSection = () => {
    let PHOTOS: string[] = [];

    if (oneBus?.images) {
      PHOTOS = oneBus?.images;
    }

    return (
      <Fragment>
        <header className="container 2xl:px-14 rounded-md sm:rounded-xl">
          <div className="relative grid grid-cols-4 gap-1 sm:gap-2">
            <div
              className="col-span-2 row-span-2 relative rounded-md sm:rounded-xl overflow-hidden cursor-pointer"
              onClick={() => handleOpenModal(0)}
            >
              <NcImage
                containerClassName="absolute inset-0"
                className="object-cover w-full h-full rounded-md sm:rounded-xl"
                src={PHOTOS[0]}
                prevImageHorizontal
              />
              <div className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity"></div>
            </div>

            {/*  */}
            <div
              className="col-span-1 row-span-2 relative rounded-md sm:rounded-xl overflow-hidden cursor-pointer"
              onClick={() => handleOpenModal(1)}
            >
              <NcImage
                containerClassName="absolute inset-0"
                className="object-cover w-full h-full rounded-md sm:rounded-xl"
                src={PHOTOS[1]}
                prevImageHorizontal
              />
              <div className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity"></div>
            </div>

            {/*  */}
            {PHOTOS.filter((_, i) => i >= 2 && i < PHOTOS.length).map(
              (item, index) => (
                <div
                  key={index}
                  className={`relative rounded-md sm:rounded-xl overflow-hidden ${
                    index >= 2 ? "block" : ""
                  }`}
                >
                  <NcImage
                    containerClassName="aspect-w-4 aspect-h-3"
                    className="object-cover w-full h-full rounded-md sm:rounded-xl "
                    src={item || ""}
                    prevImageHorizontal
                  />

                  {/* OVERLAY */}
                  <div
                    className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                    onClick={() => handleOpenModal(index + 2)}
                  />
                </div>
              )
            )}

            <div
              className="absolute hidden md:flex md:items-center md:justify-center left-3 bottom-3 px-4 py-2 rounded-xl bg-neutral-100 text-neutral-500 cursor-pointer hover:bg-neutral-200 z-10"
              onClick={() => handleOpenModal(0)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
              <span className="ml-2 text-neutral-800 text-sm font-medium">
                Show all photos
              </span>
            </div>
          </div>
        </header>
        {/* MODAL PHOTOS */}
        <ModalPhotos
          imgs={PHOTOS}
          isOpen={isOpen}
          onClose={handleCloseModal}
          initFocus={openFocusIndex}
        />
      </Fragment>
    );
  };

  if (!oneBus) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <div
        className={`nc-ListingStayDetailPage pb-20`}
        data-nc-id="ListingStayDetailPage"
      >
        {renderPhotoSection()}

        <main className="container mt-11 flex ">
          <div className="w-full lg:w-3/5 xl:w-2/3 space-y-8 lg:space-y-10 lg:pr-10">
            {renderSection1()}
          </div>

          <div className="hidden lg:block flex-grow">
            <div className="sticky top-24">{renderSidebar()}</div>
          </div>
        </main>
      </div>
    );
  }
};

export default BusDetailsPage;
