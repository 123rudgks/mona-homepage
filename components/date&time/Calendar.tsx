import ButtonBasic from '@/components/date&time/ButtonBasic';
import CalendarCell from '@/components/date&time/CalendarCell';
import { DateFieldProps } from '@/components/DateField';
import {
  CalendarDate,
  createCalendar,
  getWeeksInMonth,
  isSameMonth,
  isToday,
} from '@internationalized/date';
import { useMemo } from 'react';
import { useLocale } from 'react-aria';
import { useCalendarState } from 'react-stately';
import { twMerge } from 'tailwind-merge';
import NextMonth from './icons/NextMonth.svg';
import NextYear from './icons/NextYear.svg';
import PrevMonth from './icons/PrevMonth.svg';
import PrevYear from './icons/PrevYear.svg';
interface Props extends DateFieldProps {
  id?: string;
  _position?: 'left' | 'right';
  _startRestrictions?: string;
  _allowSameDateSelection?: boolean;
  _endRestrictions?: string;
}

const DAYS_KR = ['일', '월', '화', '수', '목', '금', '토'];
const Calendar = ({
  _dateStr,
  _setDateStr,
  _startRestrictions,
  _allowSameDateSelection,
  _endRestrictions,
  id,
  _setIsOpenCalendar,
  _position = 'left',
}: Props) => {
  const { locale } = useLocale();
  // 오늘 날짜 CalendarDate 객체
  const todayCalendarDate = useMemo(() => {
    const todayDate = new Date();
    return new CalendarDate(
      todayDate.getFullYear(),
      todayDate.getMonth() + 1,
      todayDate.getDate(),
    );
  }, []);
  // 사용자가 선택한 날짜 CalendarDate 객체
  const calendarDate = useMemo(() => {
    const date = _dateStr ? new Date(_dateStr) : new Date();
    return new CalendarDate(
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate(),
    );
  }, [_dateStr]);
  const calendarState = useCalendarState({
    defaultValue: calendarDate,
    locale,
    createCalendar,
  });
  // 현재 visible calendar 달에 해당하는 주 , ex : [0.1.2.3.4] 이렇게 표현 됨
  const weeksInMonth = getWeeksInMonth(
    calendarState?.visibleRange?.start,
    locale,
  );

  function alignDatesToSameTime(dateString: string | number | Date) {
    const date = new Date(dateString);

    // Set hours, minutes, and seconds to 0
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);

    return date;
  }

  function isDateBefore(
    dateToCheck: string | number | Date,
    providedDate: string | number | Date,
  ) {
    const dateToCheckTimestamp = _allowSameDateSelection
      ? alignDatesToSameTime(new Date(dateToCheck))
      : new Date(dateToCheck);
    const providedDateTimestamp = _allowSameDateSelection
      ? alignDatesToSameTime(new Date(providedDate))
      : new Date(providedDate);

    return dateToCheckTimestamp < providedDateTimestamp;
  }

  function isDateAfter(
    dateToCheck: string | number | Date,
    providedDate: string | number | Date,
  ) {
    const dateToCheckTimestamp = alignDatesToSameTime(new Date(dateToCheck));
    const providedDateTimestamp = alignDatesToSameTime(new Date(providedDate));

    return dateToCheckTimestamp > providedDateTimestamp;
  }

  return (
    <div
      className={twMerge(
        'absolute  z-10 mt-1 w-[300px] select-none rounded bg-white-off shadow-[0px_16px_32px_0px_#D6D8DAB2] ring-1 ring-grayscale-80',
        _position === 'left' ? 'left-0' : 'right-0',
      )}
      id={id}>
      <div className="p-3">
        <div className="typo-Body-Small-Bold mb-4 flex h-6 items-center justify-between text-grayscale-130">
          <div
            className="cursor-pointer"
            onClick={() => {
              calendarState?.focusPreviousSection(true);
              calendarState?.selectFocusedDate();
            }}>
            <PrevYear />
          </div>
          <div className="flex items-center gap-[10px]">
            <div
              className="cursor-pointer"
              onClick={() => {
                calendarState?.focusPreviousPage();
                calendarState?.selectFocusedDate();
              }}>
              <PrevMonth />
            </div>
            <div>{`${calendarState?.visibleRange?.start?.year}년 ${calendarState?.visibleRange?.start?.month}월`}</div>
            <div
              className="cursor-pointer"
              onClick={() => {
                calendarState?.focusNextPage();
                calendarState?.selectFocusedDate();
              }}>
              <NextMonth />
            </div>
          </div>
          <div
            className="cursor-pointer"
            onClick={() => {
              calendarState?.focusNextSection(true);
              calendarState?.selectFocusedDate();
            }}>
            <NextYear />
          </div>
        </div>

        <table className="w-full border-separate border-spacing-x-0 border-spacing-y-1">
          <thead className="  ">
            <tr className="typo-Men-Bold  text-grayscale-110 [&>th:first-child]:rounded-l-2xl [&>th:last-child]:rounded-r-2xl [&>th]:bg-grayscale-background-90">
              {/* 일, 월, 화 , 수 , 목, 금, 토 */}
              {Array.isArray(DAYS_KR) &&
                DAYS_KR?.map((day) => (
                  <th key={day} className="h-[22px] p-0">
                    <div className="typo-Menu-Bold flex items-center justify-center text-grayscale-110">
                      {day}
                    </div>
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            <tr className="h-[2px]"></tr>
            {weeksInMonth &&
              Array.from({ length: weeksInMonth }, (_, index) => index).map(
                (weekIndex) => (
                  <tr key={'weekIndex : ' + weekIndex}>
                    {calendarState
                      ?.getDatesInWeek(
                        weekIndex,
                        calendarState?.visibleRange?.start,
                      )
                      ?.map((date, index) => {
                        const isPreviusDate =
                          _startRestrictions || _endRestrictions
                            ? isDateBefore(
                                new Date(
                                  (date
                                    ? `${date?.year}-${date?.month}-${date?.day}`
                                    : '') || '',
                                ) || new Date(),
                                new Date(_startRestrictions || ''),
                              ) ||
                              isDateAfter(
                                new Date(
                                  (date
                                    ? `${date?.year}-${date?.month}-${date?.day}`
                                    : '') || '',
                                ) || new Date(),
                                new Date(_endRestrictions || ''),
                              )
                            : false;
                        return (
                          <CalendarCell
                            key={date?.toString()}
                            _date={date}
                            _isOutOfMonth={
                              date
                                ? !isSameMonth(
                                    date,
                                    calendarState?.visibleRange?.start,
                                  ) || isPreviusDate
                                : false
                            }
                            _isSunday={index === 0}
                            _isToday={
                              date
                                ? isToday(date, calendarState?.timeZone)
                                : false
                            }
                            _isSelected={
                              date ? calendarState?.isSelected(date) : false
                            }
                            _onClick={() => {
                              if (date && !isPreviusDate) {
                                calendarState?.selectDate(date);
                                _setDateStr(date?.toString());
                                _setIsOpenCalendar && _setIsOpenCalendar(false);
                              }
                            }}
                          />
                        );
                      })}
                  </tr>
                ),
              )}
          </tbody>
        </table>
        <div className="mt-3 flex justify-end">
          <ButtonBasic
            type="button"
            className="rounded-full text-grayscale-100"
            buttonSize="small"
            buttonType="grayscaleOutline"
            onClick={() => {
              calendarState?.setFocusedDate(todayCalendarDate);
              calendarState?.selectFocusedDate();
            }}>
            오늘
          </ButtonBasic>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
