import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import { DateRangePicker, DateRange } from "react-date-range";

export default function DatePicker({
  state,
  changeCallback,
}: {
  state: Array<DateStateType>;
  changeCallback: (item: any) => void;
}) {
  return (
    <div>
      <div className="hidden md:block">
        <DateRangePicker
          onChange={changeCallback}
          moveRangeOnFirstSelection={false}
          months={1}
          ranges={state}
          direction="horizontal"
        />
      </div>
      <div className="md:hidden">
        <DateRange
          onChange={changeCallback}
          moveRangeOnFirstSelection={false}
          months={1}
          ranges={state}
          direction="horizontal"
        />
      </div>
    </div>
  );
}
