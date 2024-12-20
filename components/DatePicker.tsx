'use client';
import Calendar from '@/components/date&time/Calendar';
import DateField, { DateFieldProps } from '@/components/DateField';

import useClickOutside from '@/hooks/useClickOutside';
import { InputHTMLAttributes, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

/**
 * 날짜를 직접 input에 입력하거나 calendar를 띄워서 선택할 수 있는 컴포넌트
 * _dateStr : date string
 * _setDateStr : set function for changing date string
 * _calendarPosition : position of calendar, left or right of input
 */
export interface DatePickerProps extends DateFieldProps {
  _calendarPosition?: 'left' | 'right';
  _startRestrictions?: string;
  _endRestrictions?: string;
  disabled?: boolean;
  _allowSameDateSelection?: boolean;
  _addBottomMargin?: boolean;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
}

const DatePicker = ({
  _dateStr,
  _setDateStr,
  _calendarPosition,
  _startRestrictions,
  _allowSameDateSelection = false,
  _endRestrictions,
  disabled = false,
  _addBottomMargin = false,
  ...rest
}: DatePickerProps) => {
  const [isCalendar, setIsCalendar] = useState<boolean>(false);
  const dateFieldWrapperRef = useRef<HTMLDivElement>(null);
  const _ = useClickOutside(dateFieldWrapperRef, () => setIsCalendar(false));
  // DatePicker 컴포넌트 마운트시 outsideClick 체크하기 위한 random id

  return (
    <div
      className={twMerge(
        'relative w-full',
        disabled && 'bg-grayscale-background-90',
        isCalendar && _addBottomMargin && 'mb-[310px]',
      )}
      id="dd"
      ref={dateFieldWrapperRef}>
      <div>
        <DateField
          _dateStr={_dateStr ?? ''}
          _setDateStr={_setDateStr}
          _setIsOpenCalendar={(value) => {
            setIsCalendar(value ?? false);
          }}
          {...rest}
        />
      </div>

      {isCalendar && !disabled && (
        <Calendar
          _allowSameDateSelection={_allowSameDateSelection}
          _startRestrictions={_startRestrictions}
          _endRestrictions={_endRestrictions}
          _dateStr={_dateStr}
          _setDateStr={_setDateStr}
          _setIsOpenCalendar={(value) => {
            setIsCalendar(value ?? false);
          }}
          _position={_calendarPosition}
        />
      )}
    </div>
  );
};

export default DatePicker;
