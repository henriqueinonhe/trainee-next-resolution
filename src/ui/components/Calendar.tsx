/* eslint-disable react/display-name */
import cx from "./Calendar.module.scss";
import { groupBy, range } from "lodash";
import randomcolor from "randomcolor";
import { CalendarHeader } from "./CalendarHeader";
import { CalendarEntry } from "./CalendarEntry";

export type CalendarProps = {
  entries: Array<CalendarEntry>;
};

const colorList = Array.from({ length: 100 }).map(() =>
  randomcolor({ luminosity: "light" }),
);

export const Calendar = ({ entries }: CalendarProps) => {
  const groupColors = Object.keys(groupBy(entries, "group")).reduce(
    (accum, key, index) => ({
      ...accum,
      [key]: colorList[index],
    }),
    {},
  );

  const headerSpan = 2;
  const daysInAWeek = 7;
  const halfHoursInADay = 48;

  return (
    <div className={cx.calendar}>
      <CalendarHeader />

      {range(0, halfHoursInADay * daysInAWeek).map((index) => (
        <div
          key={index}
          className={cx.cell}
          style={{
            gridColumn: headerSpan + Math.floor(index / halfHoursInADay),
            gridRowStart: headerSpan + (index % halfHoursInADay),
            gridRowEnd: headerSpan + (index % halfHoursInADay),
          }}
        ></div>
      ))}

      {entries.map((entry) => (
        <CalendarEntry key={entry.id} entry={entry} groupColors={groupColors} />
      ))}
    </div>
  );
};
