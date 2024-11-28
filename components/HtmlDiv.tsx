type Props = {
  html: string;
};

const HtmlDiv = ({ html }: Props) => {
  return (
    <div
      className="whitespace-pre-line"
      dangerouslySetInnerHTML={{
        __html: html,
      }}
    />
  );
};

export default HtmlDiv;
