import CalendarIcon from '@/app/svgs/Calendar.svg';
import Input from '@/components/Input';
import { InputHTMLAttributes, useState } from 'react';
/**
 * 직접 타이핑하여 날짜를 입력할 수 있는 input
 * 싱글 클릭 : calendar 띄움, 더블 클릭 : input에 직접 입력 가능
 */
export interface DateFieldProps {
  _dateStr: string;
  _setDateStr: (dateStr: string) => void;
  _setIsOpenCalendar?: (isOpen?: boolean) => void;
  _calendarIcon?: boolean;
  _placeholder?: string;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
}
const DateField = ({
  inputProps,
  _dateStr,
  _setDateStr,
  _setIsOpenCalendar,
  _calendarIcon = true,
  ...rest
}: DateFieldProps) => {
  // 더블 클릭시 input readOnly 해제
  const [writingMode, setWritingMode] = useState<boolean>(false);

  return (
    <Input
      Icon={<CalendarIcon />}
      inputProps={{
        placeholder: rest?._placeholder || '날짜 선택',
        ...inputProps,
        readOnly: !writingMode,

        onDoubleClick: () => {
          setWritingMode(true);
          _setIsOpenCalendar && _setIsOpenCalendar(false);
        },
        onClick: () => {
          if (!writingMode && _setIsOpenCalendar) {
            _setIsOpenCalendar(true);
          }
        },
        value: _dateStr ?? '',
        onChange: (e) => {
          const result = handleDateInputValue(e?.target?.value, _dateStr);
          _setDateStr(result);
        },
        onBlur: (e) => {
          setWritingMode(false);
          const result = handleInCompleteDate(e?.target?.value);
          _setDateStr(result);
        },
      }}
      {...rest}
    />
  );
};

const handleInCompleteDate = (value: string): string => {
  const rawValue = value?.replace(/-/g, '');
  if (isNaN(Number(rawValue)) || rawValue?.length < 4) return '';
  const adjustDayOrMonth = (value: string): string => {
    const numValue = Number(value);
    if (value?.length === 2 && numValue > 0) return value;
    if (value?.length === 1 && numValue > 0) return '0' + value;
    return '01';
  };
  const year = rawValue?.slice(0, 4);
  const month = adjustDayOrMonth(rawValue?.slice(4, 6));
  const day = adjustDayOrMonth(rawValue?.slice(6, 8));
  if (year?.length < 4) return '';
  return `${year}-${month}-${day}`;
};

const handleDateInputValue = (value: string, prevValue: string): string => {
  const rawValue = value?.replace(/-/g, '');
  if (isNaN(Number(rawValue))) return prevValue;
  let year = rawValue?.slice(0, 4);
  let month = rawValue?.slice(4, 6);
  let day = rawValue?.slice(6, 8);
  let result = '';
  // month 설정
  if (!!month && Number(month) > 12) {
    day = month?.slice(1) + day;
    month = '0' + month?.slice(0, 1);
  }
  const getMaxDayInMonth = () => {
    const daysInMonth = {
      standard: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      leapyear: [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    };
    function isLeapYear(year: number): boolean {
      return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
    }
    return daysInMonth?.[isLeapYear(Number(year)) ? 'leapyear' : 'standard'][
      Number(month) - 1
    ];
  };

  // day 설정
  const maxDayInMonth = getMaxDayInMonth();
  if (!!day && Number(day) > maxDayInMonth) {
    day = maxDayInMonth?.toString();
  }
  result = `${year}${month ? '-' + month : ''}${day ? '-' + day : ''}`;
  return result;
};
export default DateField;
