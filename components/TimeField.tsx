'use client';
import ClockIcon from '@/app/svgs/Clock.svg';
import DropdownItemBasic from '@/components/dropdown/DropdownItemBasic';
import DropDownItemContainer from '@/components/dropdown/DropDownItemContainer';
import Input from '@/components/Input';
import useClickOutside from '@/hooks/useClickOutside';
import { generateTimeList } from '@/utils/helpers';
import { InputHTMLAttributes, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

const DIVISION_STR = ':';
const TIME_LIST = generateTimeList();

// 시간이 incomplete 일 경우 auto complete
const handleIncompleteTime = (value: string) => {
  let [hour, minute] = value?.split(DIVISION_STR);
  if (!hour) return ''; // hour가 없을 경우는 입력 안됨 처리
  minute = minute ?? ''; // padStart하기 위해 undefined일 경우 ''로 변환
  hour = hour?.padStart(2, '0');
  minute = minute?.padStart(2, '0');
  return `${hour}${DIVISION_STR}${minute}`;
};
// input change handler
const handleTimeInputChange = (value: string, prevValue: string): string => {
  const rawValue = value?.replace(DIVISION_STR, '');
  if (isNaN(Number(rawValue))) return prevValue;
  let hour = rawValue?.slice(0, 2);
  let minute = rawValue?.slice(2, 4);

  let result = '';
  // hour 설정
  if (!!hour && Number(hour) >= 24) {
    minute = hour?.slice(1) + minute;
    hour = hour?.slice(0, 1)?.padStart(2, '0');
  }
  // minute 설정
  if (!!minute && Number(minute) > 59) {
    minute = '59';
  }
  result = `${hour}${minute ? DIVISION_STR + minute : ''}`;
  return result;
};

/**
 * 시간을 직접 input에 입력하거나 시간을 선택할 수 있는 컴포넌트
 */
interface Props {
  _timeStr: string;
  _startRestrictions?: string;
  _setTimeStr: (dateStr: string) => void;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  disabled?: boolean;
}
const TimeField = ({
  inputProps,
  _startRestrictions,
  disabled = false,
  _timeStr,
  _setTimeStr,
  ...rest
}: Props) => {
  const [isOpenDropBox, setIsOpenDropBox] = useState<boolean>(false);
  const timeFieldWrapperRef = useRef<HTMLDivElement>(null);
  const _ = useClickOutside(timeFieldWrapperRef, () => setIsOpenDropBox(false));
  // 더블 클릭시 input readOnly 해제
  const [writingMode, setWritingMode] = useState<boolean>(false);

  return (
    <div
      className={twMerge(
        'relative w-full',
        disabled && 'bg-grayscale-background-90',
      )}
      ref={timeFieldWrapperRef}>
      {isOpenDropBox && !disabled && (
        <DropDownItemContainer className="h-[98px]">
          {Array.isArray(TIME_LIST) &&
            TIME_LIST?.map((time) => {
              const isDisabled = _startRestrictions
                ? Number(time?.replace(':', '')) <=
                  Number(_startRestrictions?.replace(':', ''))
                : false;
              return (
                <DropdownItemBasic
                  disabled={isDisabled}
                  key={time}
                  onClick={(e) => {
                    if (!isDisabled) {
                      _setTimeStr(time);
                      setIsOpenDropBox(false);
                    }
                  }}>
                  {time}
                </DropdownItemBasic>
              );
            })}
        </DropDownItemContainer>
      )}
      <Input
        Icon={<ClockIcon />}
        inputProps={{
          ...inputProps,
          readOnly: !writingMode,
          value: _timeStr ?? '',
          onChange: (e) => {
            const result = handleTimeInputChange(e?.target?.value, _timeStr);
            _setTimeStr(result);
          },
          onDoubleClick: () => {
            setWritingMode(true);
            setIsOpenDropBox(false);
          },
          onClick: () => {
            if (!writingMode) {
              setIsOpenDropBox(true);
            }
          },
          onBlur: (e) => {
            setWritingMode(false);
            const result = handleIncompleteTime(e?.target?.value);
            _setTimeStr(result);
          },
          placeholder: '시간 선택',
        }}
      />
    </div>
  );
};

export default TimeField;
