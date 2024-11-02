type Props = {
  title?: string;
  desc: string[];
};

const BoardSection = ({ title, desc }: Props) => {
  return (
    <div className="flex justify-center items-center relative overflow-hidden w-full lg-screen:h-[545px] sm-screen:h-[414px] h-[240px] bg-navy-700 sm-screen:pt-[100px] pt-16">
      <div className="absolute bottom-0 right-0 -translate-x-1/4 translate-y-1/2 aspect-square h-full rounded-full bg-primary opacity-10 blur-[150px]" />
      <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 aspect-square h-[200%] rounded-full bg-gradient-radial from-transparent to-primary opacity-10 " />
      <div className="absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2 aspect-square h-[200%] rounded-full bg-gradient-radial from-transparent to-primary opacity-10" />
      <div className="absolute bottom-0 right-0 -translate-x-1/4 rounded-r-full aspect-square h-[200%]  bg-gradient-to-r from-transparent to-primary opacity-10" />
      <div className="flex flex-col gap-4 text-white text-center">
        <span className="typo-Display5Bold ">{title}</span>
        <div className="flex flex-col">
          {desc.map((text, i) => (
            <span key={text} className="typo-TitleMedium">
              {text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BoardSection;
