// My Component

import { useState, useEffect, FormEvent } from "react";
import { useHistory } from "react-router";
import { FocusedInputShape } from "react-dates";
import ButtonSubmit from "./ButtonSubmit";
import moment from "moment";
import BusDatesRangeInput from "./BusDatesRangeInput";
import BusCityInput from "./BusCityInput";
import BusDateSingleInput from "./BusDateSingleInput";

import {
  fetchBusCitiesAsync,
  addUserInput,
  fetchBusListAsync,
} from "app/feature/bus/busSlice";
import { useAppDispatch, useAppSelector } from "app/hook";
import { City, BusUserInput } from "app/feature/bus/busInterfaces";

export interface DateRage {
  startDate: moment.Moment | null;
  endDate: moment.Moment | null;
}

const BusSearchForm = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch<any>(fetchBusCitiesAsync());
  }, [dispatch]);

  const { cities, busUserInput } = useAppSelector((state) => state.bus);

  const [userInput, setUserInput] = useState<BusUserInput>();
  const [roundTrip, setRoundTrip] = useState(false);
  const [dateValue, setdateValue] = useState(
    busUserInput?.journeyDate ? moment(busUserInput.journeyDate) : null
  );

  const [dateRangeValue, setDateRangeValue] = useState<DateRage>({
    startDate: dateValue,
    endDate: busUserInput?.returnDate ? moment(busUserInput.returnDate) : null,
  });

  const [dateFocused, setDateFocused] = useState<boolean>(false);

  const originInputValue = busUserInput?.fromCity.locName || "";
  const destinationInputValue = busUserInput?.toCity.locName || "";

  const [origin, setOrigin] = useState<City>();
  const [destination, setDestination] = useState<City>();

  const [fieldFocused, setFieldFocused] = useState<
    FocusedInputShape | "dropOffInput" | null
  >(null);

  const [dropOffLocationType, setDropOffLocationType] = useState<
    "same" | "different"
  >("same");

  const setOriginHandler = (ev: string) => {
    cities.forEach((city: City) => city.locName === ev && setOrigin(city));
  };

  const setDestinationHandler = (ev: string) => {
    cities.forEach((city: City) => city.locName === ev && setDestination(city));
  };

  const formSubmitOneWay = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    if (origin && destination && dateValue) {
      setUserInput({
        fromCity: origin,
        toCity: destination,
        journeyDate: dateValue?.toISOString(),

        roundTrip: roundTrip,
      });
      dispatch<any>(
        fetchBusListAsync({
          fromCityId: origin.locId,
          toCityId: destination.locId,
          depDate: dateValue.toISOString(),
        })
      );
    }
  };

  const formSubmitRoundtrip = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    if (
      origin &&
      destination &&
      dateRangeValue.startDate &&
      dateRangeValue.endDate
    ) {
      setUserInput({
        fromCity: origin,
        toCity: destination,
        journeyDate: dateRangeValue.startDate?.toISOString(),
        returnDate: dateRangeValue.endDate?.toISOString(),
        roundTrip: roundTrip,
      });
      dispatch<any>(
        fetchBusListAsync({
          fromCityId: origin.locId,
          toCityId: destination.locId,
          depDate: dateRangeValue.startDate?.toISOString(),
        })
      );
    }
  };

  useEffect(() => {
    if (roundTrip) {
      if (
        userInput?.fromCity &&
        userInput?.toCity &&
        userInput.journeyDate &&
        userInput.roundTrip
      ) {
        dispatch(addUserInput(userInput));
        history.push("/bus");
      }
    } else {
      if (userInput?.fromCity && userInput?.toCity && userInput.journeyDate) {
        dispatch(addUserInput(userInput));
        history.push("/bus");
      }
    }
  }, [userInput]);

  const renderRadioBtn = () => {
    return (
      <div className=" py-5 [ nc-hero-field-padding ] flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:space-x-10 border-b border-neutral-100 dark:border-neutral-800">
        <div className="flex  items-center">
          <input
            id="same-drop-off"
            name="drop-off-type"
            type="radio"
            value="same"
            className="focus:ring-primary-500 h-4 w-4 text-primary-500 border-neutral-300"
            checked={dropOffLocationType === "same"}
            onChange={(e) => {
              setRoundTrip(false);
              setDropOffLocationType(e.currentTarget.value as "same");
            }}
          />
          <label
            htmlFor="same-drop-off"
            className="ml-2 sm:ml-3 block text-sm font-medium text-gray-700 dark:text-neutral-300"
          >
            One Way
          </label>
        </div>
        <div className="flex items-center">
          <input
            id="different-drop-off"
            name="drop-off-type"
            value="different"
            type="radio"
            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
            checked={dropOffLocationType === "different"}
            onChange={(e) => {
              setRoundTrip(true);
              setDropOffLocationType(e.currentTarget.value as "different");
            }}
          />
          <label
            htmlFor="different-drop-off"
            className="ml-2 sm:ml-3 block text-sm font-medium text-gray-700 dark:text-neutral-300"
          >
            Round Trip
          </label>
        </div>
      </div>
    );
  };

  const renderOneWayForm = () => {
    return (
      <form className="flex flex-col md:flex-row" onSubmit={formSubmitOneWay}>
        <BusCityInput
          onInputDone={() =>
            setFieldFocused(
              dropOffLocationType === "different" ? "dropOffInput" : "startDate"
            )
          }
          originInputValue={originInputValue}
          city={cities}
          onChange={(ev) => setOriginHandler(ev)}
          placeHolder="From"
          desc="Your Origin"
        />

        <BusCityInput
          onInputDone={() =>
            setFieldFocused(
              dropOffLocationType === "different" ? "dropOffInput" : "startDate"
            )
          }
          originInputValue={destinationInputValue}
          city={cities}
          onChange={(ev) => setDestinationHandler(ev)}
          placeHolder="To"
          desc="Your Destination City"
        />

        <BusDateSingleInput
          defaultValue={dateValue}
          defaultFocus={dateFocused}
          onChange={(date) => setdateValue(date)}
          onFocusChange={(focus: boolean) => {
            setDateFocused(focus);
          }}
        />

        {/* BUTTON SUBMIT OF FORM */}
        <div className=" px-4 py-4">
          <ButtonSubmit />
        </div>
      </form>
    );
  };

  const renderRoundTrip = () => {
    return (
      <form
        onSubmit={formSubmitRoundtrip}
        className="w-full relative mt-8 rounded-3xl shadow-xl dark:shadow-2xl bg-white dark:bg-neutral-900"
      >
        <div className=" flex flex-col md:flex-row md:items-center w-full rounded-full [ nc-divide-field ] ">
          <div className="relative flex flex-col nc-flex-2-auto [ nc-divide-field ] ">
            <BusCityInput
              onInputDone={() =>
                setFieldFocused(
                  dropOffLocationType === "different"
                    ? "dropOffInput"
                    : "startDate"
                )
              }
              originInputValue={originInputValue}
              city={cities}
              autoFocus={fieldFocused === "dropOffInput"}
              onChange={(ev) => setOriginHandler(ev)}
              placeHolder="From"
              desc="Your Origin"
            />

            <BusCityInput
              onInputDone={() =>
                setFieldFocused(
                  dropOffLocationType === "different"
                    ? "dropOffInput"
                    : "startDate"
                )
              }
              originInputValue={destinationInputValue}
              city={cities}
              onChange={(ev) => setDestinationHandler(ev)}
              placeHolder="To"
              desc="Your Destination City"
            />
          </div>

          <BusDatesRangeInput
            defaultDateValue={dateRangeValue}
            onChange={(data) => setDateRangeValue(data)}
          />

          <div className="px-4 py-3">
            <ButtonSubmit />
          </div>
        </div>
      </form>
    );
  };

  return (
    <div className="w-full">
      <div className="w-full relative mt-8 rounded-3xl shadow-xl dark:shadow-2xl bg-white dark:bg-neutral-900">
        {renderRadioBtn()}
        {dropOffLocationType === "same" && renderOneWayForm()}
        {dropOffLocationType === "different" && renderRoundTrip()}
      </div>
    </div>
  );
};

export default BusSearchForm;
