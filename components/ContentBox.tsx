type Props = {
  label?: string;
  title: string;
  subTitle?: React.ReactNode;
  children: React.ReactNode;
};

const ContentBox = ({ label, title, subTitle, children }: Props) => {
  return (
    <div className="flex-1">
      {label && (
        <div className="sm-screen:typo-HeadlineBold typo-BodyLargeBold text-primary">
          {label}
        </div>
      )}
      <div className="mb-8">
        <div className="sm-screen:typo-Display6Bold text-navy-700 typo-Display1Bold ">
          {title}
        </div>
        {subTitle}
      </div>
      {children}
    </div>
  );
};

export default ContentBox;
