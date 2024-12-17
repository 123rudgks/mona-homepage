import 'react-quill/dist/quill.snow.css';
import '../app/custom-quill.css';

type Props = {
  html: string;
};

const HtmlDiv = ({ html }: Props) => {
  return (
    <div
      className="whitespace-pre-line ql-container ql-editor"
      dangerouslySetInnerHTML={{
        __html: html,
      }}
    />
  );
};

export default HtmlDiv;
