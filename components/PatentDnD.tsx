'use client';
import ThreeLine from '@/app/svgs/admin/ThreeLine.svg';
import Trash from '@/app/svgs/admin/Trash.svg';
import LeftChevron from '@/app/svgs/main/ChevronLeft.svg';
import DropdownItemBasic from '@/components/dropdown/DropdownItemBasic';
import DropDownItemContainer from '@/components/dropdown/DropDownItemContainer';
import Input from '@/components/Input';
import { cn } from '@/lib/utils';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
type Props = {};

const PatentDND = (props: Props) => {
  return <div>PatentDND</div>;
};

export const PatentContainer = ({ children }: { children: ReactNode }) => {
  return <DndProvider backend={HTML5Backend}>{children}</DndProvider>;
};
export const PatentDropRow = ({
  children,
  onDrop,
}: {
  children: ReactNode;
  onDrop: (draggedId: string) => void;
}) => {
  const dragRef = useRef<HTMLDivElement | null>(null);
  const [collectedProps, drop] = useDrop(() => ({
    accept: 'PATENT_ROW',
    drop: (item: { id: string }, monitor) => {
      onDrop(item.id);
    },
    hover: (item, monitor) => {},
  }));
  useEffect(() => {
    drop(dragRef);
  }, [drop]);
  return <div ref={dragRef}>{children}</div>;
};
export const PatentRow = ({
  title,
  year,
  id,
  onDelete,
  onChange,
}: {
  year: string;
  title: string;
  id: string;
  onDelete: () => void;
  onChange: ({
    id,
    year,
    title,
  }: {
    id: string;
    year: string;
    title: string;
  }) => void;
}) => {
  const dragRef = useRef<HTMLDivElement | null>(null);
  const dragPreviewRef = useRef<HTMLDivElement | null>(null);
  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type: 'PATENT_ROW',
    item: { id: id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));
  useEffect(() => {
    drag(dragRef);
    dragPreview(dragPreviewRef);
  }, [drag, dragPreview]);
  return (
    <div
      ref={dragPreviewRef}
      className={cn(
        'flex gap-4 items-center bg-grayscale-50 p-6 rounded-[20px]',
        isDragging ? 'opacity-50' : '',
      )}>
      <div ref={dragRef} className="cursor-pointer">
        <ThreeLine />
      </div>
      <div className="flex-col gap-4 items-center flex-1 sm-screen:flex sm-screen:flex-row">
        <YearSelectBox
          year={Number(year)}
          setYear={(year) => {
            onChange({
              id,
              year: year.toString(),
              title,
            });
          }}
        />
        <div className="h-10 flex-1 bg-white">
          <Input
            inputProps={{
              className: 'typo-BodyLargeRegular',
              placeholder: '특허명',
              value: title,
              onChange: (e) => {
                onChange({
                  id,
                  year,
                  title: e.target.value,
                });
              },
            }}
          />
        </div>
      </div>

      <div
        className="w-10 h-10 cursor-pointer ring-1 ring-grayscale-200 rounded flex items-center justify-center bg-white"
        onClick={() => {
          onDelete();
        }}>
        <Trash />
      </div>
    </div>
  );
};
const YearSelectBox = ({
  year,
  setYear,
}: {
  year?: number;
  setYear: (year: number) => void;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const startYear = 2010;
  const endYear = new Date().getFullYear();

  const years = Array.from(
    { length: endYear - startYear + 1 },
    (_, idx) => endYear - idx,
  );

  return (
    <div className="relative sm-screen:w-[84px] sm-screen:flex-none h-10 bg-white flex-1">
      <div
        className="flex justify-between items-center ring-1 ring-grayscale-200 w-full h-full p-2 rounded cursor-pointer"
        onClick={() => {
          setOpen(!open);
        }}>
        <span>{year}</span>
        <span
          className={cn(
            'h-[18px] w-[18px]',
            open ? ' rotate-90' : '-rotate-90',
          )}>
          <LeftChevron className="[&>path]:fill-grayscale-500" />
        </span>
      </div>
      {open && (
        <DropDownItemContainer className="h-[256px] bg-white">
          {years.map((year) => (
            <DropdownItemBasic
              key={year}
              className="cursor-pointer"
              onClick={() => {
                setYear(year);
                setOpen(false);
              }}>
              {year}
            </DropdownItemBasic>
          ))}
        </DropDownItemContainer>
      )}
    </div>
  );
};
export default PatentDND;
