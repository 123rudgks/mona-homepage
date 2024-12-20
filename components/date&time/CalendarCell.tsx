import { CalendarDate } from '@internationalized/date';
import { useMemo } from 'react';

type Props = {
  _date: CalendarDate | null;
  _isOutOfMonth: boolean;
  _isSunday: boolean;
  _isSelected?: boolean;
  _isToday?: boolean;
  _onClick: () => void;
};

const CalendarCell = ({
  _date,
  _isOutOfMonth,
  _isSunday,
  _isSelected,
  _isToday,
  _onClick,
  ...rest
}: Props) => {
  const cellStyle = useMemo(() => {
    if (_isSelected) return 'bg-primary-100 text-white-off';
    if (_isToday) return 'ring-1 ring-primary-100 text-primary-100';
    if (_isOutOfMonth) return 'text-grayscale-90';
    if (_isSunday) return 'text-danger-100';
    return 'text-grayscale-130';
  }, [_isSunday, _isOutOfMonth, _isSelected, _isToday]);
  return (
    <td
      className="cursor-pointer"
      onClick={() => {
        _onClick();
      }}>
      <div className="flex h-full w-full   items-center justify-center">
        <div
          className={`${cellStyle} typo-Menu-Regular flex h-6  w-6 items-center justify-center rounded-full`}>
          {_date?.day}
        </div>
      </div>
    </td>
  );
};

export default CalendarCell;
