import { FC, useEffect, useState } from "react";
import {
  AnchorDirectionShape,
  DateRangePicker,
  FocusedInputShape,
} from "react-dates";
import { DateRage } from "./BusSearchForm";
import ClearDataButton from "./ClearDataButton";
import useWindowSize from "hooks/useWindowResize";

type Fields = "Departure Date" | "Round Trip";

export interface RentalCarDatesRangeInputProps {
  defaultDateValue: DateRage;
  defaultFocus?: FocusedInputShape | null;
  onChange?: (data: DateRage) => void;
  onFocusChange?: (focus: FocusedInputShape | null) => void;
  fieldClassName?: string;
  wrapFieldClassName?: string;
  numberOfMonths?: number;
  anchorDirection?: AnchorDirectionShape;
}

const BusDatesRangeInput: FC<RentalCarDatesRangeInputProps> = ({
  defaultDateValue,
  onChange,
  defaultFocus = null,
  onFocusChange,
  fieldClassName = "[ nc-hero-field-padding ]",
  wrapFieldClassName = "flex flex-col xl:flex-row xl:items-center w-full flex-shrink-0 relative [ nc-divide-field ]",
  numberOfMonths,
  anchorDirection,
}) => {
  const [focusedInput, setFocusedInput] = useState(defaultFocus);
  const [stateDate, setStateDate] = useState(defaultDateValue);

  //
  useEffect(() => {
    setStateDate(defaultDateValue);
  }, [defaultDateValue]);

  useEffect(() => {
    setFocusedInput(defaultFocus);
  }, [defaultFocus]);

  useEffect(() => {
    if (onChange) {
      onChange(stateDate);
    }
  }, [stateDate]);

  const windowSize = useWindowSize();

  const handleClearData = (field: Fields) => {
    switch (field) {
      case "Departure Date": {
        return setStateDate((date) => ({ ...date, startDate: null }));
      }
      case "Round Trip": {
        return setStateDate((date) => ({ ...date, endDate: null }));
      }

      default:
        break;
    }
  };

  const handleDateFocusChange = (focus: FocusedInputShape | null) => {
    setFocusedInput(focus);
    onFocusChange && onFocusChange(focus);
  };

  const renderJourneyDate = () => {
    const focused = focusedInput === "startDate";
    return (
      <div
        className={`flex flex-1 relative  ${fieldClassName} flex-shrink-0 items-center space-x-3 cursor-pointer ${
          focused ? "shadow-2xl rounded-full dark:bg-neutral-800" : " "
        }`}
        onClick={() => handleDateFocusChange("startDate")}
      >
        <div className="text-neutral-300 dark:text-neutral-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="nc-icon-field"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>

        <div className="flex-grow flex-shrink-0">
          <span className="block xl:text-lg font-semibold">
            {stateDate.startDate
              ? stateDate.startDate.format("DD-MMM-YYYY")
              : "Journey Date"}
          </span>
          <span className="block mt-1 text-sm text-neutral-400 leading-none font-light">
            {stateDate.startDate ? "Journey Date" : `Add date`}
          </span>
          {stateDate.startDate && focused && (
            <ClearDataButton
              onClick={() => handleClearData("Departure Date")}
            />
          )}
        </div>
      </div>
    );
  };

  const renderReturnDate = () => {
    const focused = focusedInput === "endDate";
    return (
      <div
        className={`flex relative flex-1  ${fieldClassName} flex-shrink-0 items-center space-x-3 cursor-pointer ${
          focused ? "shadow-2xl rounded-full dark:bg-neutral-800" : " "
        }`}
        onClick={() => handleDateFocusChange("endDate")}
      >
        <div className="text-neutral-300 dark:text-neutral-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="nc-icon-field"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>

        <div className="flex-grow">
          <span className="block xl:text-lg font-semibold">
            {stateDate.endDate
              ? stateDate.endDate.format("DD-MMM-YYYY")
              : "Return Date"}
          </span>
          <span className="block mt-1 text-sm text-neutral-400 leading-none font-light">
            {stateDate.endDate ? "Return Date" : `Add date`}
          </span>
          {stateDate.endDate && focused && (
            <ClearDataButton onClick={() => handleClearData("Round Trip")} />
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="relative flex-shrink-0 flex nc-flex-2-auto z-10 ">
      <div className="absolute inset-x-0 bottom-0">
        <DateRangePicker
          startDate={stateDate.startDate}
          endDate={stateDate.endDate}
          focusedInput={focusedInput}
          onDatesChange={(date) => setStateDate(date)}
          onFocusChange={handleDateFocusChange}
          numberOfMonths={
            numberOfMonths || (windowSize.width <= 1024 ? 1 : undefined)
          }
          startDateId={"nc-hero-stay-startDateId"}
          endDateId={"nc-hero-stay-endDateId"}
          daySize={windowSize.width > 500 ? 56 : undefined}
          orientation={"horizontal"}
          showClearDates
          noBorder
          keepOpenOnDateSelect
          hideKeyboardShortcutsPanel
          anchorDirection={anchorDirection}
        />
      </div>

      <div
        className={`flex flex-col lg:flex-row lg:items-center w-full flex-shrink-0 relative  ${wrapFieldClassName}`}
      >
        {renderJourneyDate()}
        {renderReturnDate()}
      </div>
    </div>
  );
};

export default BusDatesRangeInput;
