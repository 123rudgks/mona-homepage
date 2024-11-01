type Props = {
  label?: string;
  title: string;
  children: React.ReactNode;
};

const ContentBox = ({ label, title, children }: Props) => {
  return (
    <div className="">
      {label && (
        <div className="sm-screen:typo-HeadlineBold typo-BodyLargeBold text-primary">
          {label}
        </div>
      )}
      <div className="sm-screen:typo-Display6Bold text-navy-700 typo-Display1Bold">
        {title}
      </div>
      {children}
    </div>
  );
};

export default ContentBox;
