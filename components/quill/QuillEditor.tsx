'use client';
import '@/app/custom-quill.css';
import { authFetch } from '@/utils/apis';
import { base64ToFile, urlToFile } from '@/utils/helpers';
import { useRef } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
const fontSizeArr = [
  '8px',
  '9px',
  '10px',
  '12px',
  '14px',
  '16px',
  '20px',
  '24px',
  '32px',
  '42px',
  '54px',
  '68px',
  '84px',
  '98px',
];
let Size = Quill.import('formats/size');
Size.whitelist = fontSizeArr;
Quill.register(Size, true);

let Font = Quill.import('attributors/class/font');
Font.whitelist = ['pretendard', 'serif', 'monospace'];
Quill.register(Font, true);

const formats = [
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'color',
  'background',
  'script',
  'header',
  'blockquote',
  'code-block',
  'indent',
  'list',
  'direction',
  'align',
  'link',
  'image',
  'video',
  'formula',
]; // add custom format name + any built-in formats you need

type Props = {
  value: string;
  setValue: (value: string) => void;
};

const QuillEditor = ({ value, setValue }: Props) => {
  const quillRef = useRef<ReactQuill | null>(null);
  const modules = {
    toolbar: [
      [
        { font: ['pretendard'] },
        { size: ['small', false, 'large', 'huge', '8px'] },
      ],
      [{ header: '1' }, { header: '2' }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ color: [] }, { background: [] }],

      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      [{ script: 'sub' }, { script: 'super' }],
      ['link', 'image'],
    ],
  };

  // 이미지 URL을 변경하는 함수

  return (
    <>
      <CustomToolbar />
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={(content, delta, source, editor) => {
          changeImgSrc(content)
            .then((res) => {
              setValue(res);
            })
            .catch((err) => {});
        }}
        // modules={modules}
        modules={{
          toolbar: '#toolbar',
        }}
        formats={formats}
      />
    </>
  );
};

const getUploadedImgUrl = async (file: File) => {
  const formData = new FormData();
  formData.append('image', file);
  const response = await authFetch('/api/upload', {
    method: 'POST',
    body: formData,
  });
  if (response) {
    const res = await response.json();
    if (res.code === 200) {
      return res.data;
    }
    return null;
  }
  return null;
};

const changeImgSrc = async (html: string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const imgTags = doc.querySelectorAll('img');

  const promises = Array.from(imgTags).map(async (el) => {
    const _src = el.getAttribute('src');
    let file: File | undefined;
    if (!_src) {
      el.remove();
    } else if (
      _src.startsWith(
        'https://monalec-dev.s3.ap-northeast-2.amazonaws.com/images/',
      )
    ) {
      return;
    } else {
      if (_src.startsWith('data:image')) {
        file = base64ToFile(_src, 'upload_image.png');
      } else {
        file = await urlToFile(_src, 'upload_image.png');
      }
      if (file) {
        const url = await getUploadedImgUrl(file);
        if (url) {
          el.setAttribute('src', url);
        } else {
          el.remove();
        }
      } else {
        el.remove();
      }
    }
  });
  await Promise.all(promises);
  return doc.body.innerHTML;
};
const CustomToolbar = () => {
  return (
    <div id={'toolbar'}>
      <span className="ql-formats">
        <select className="ql-font" defaultValue={'pretendard'}>
          <option value={'pretendard'}>pretendard</option>
          <option value={'serif'}></option>
          <option value={'monospace'}></option>
        </select>
      </span>
      <span className="ql-formats">
        <select className="ql-size" defaultValue={'14px'}>
          {fontSizeArr.map((size) => (
            <option key={size + 'px'} value={size}>
              {size}
            </option>
          ))}
        </select>
      </span>

      <span className="ql-formats">
        <button className="ql-bold"></button>
        <button className="ql-italic"></button>
        <button className="ql-underline"></button>
        <button className="ql-strike"></button>
        <button className="ql-blockquote"></button>
      </span>
      <span className="ql-formats">
        <select className="ql-color" defaultValue={'#000000'}></select>
        <select className="ql-background" defaultValue={'#ffffff'}></select>
      </span>
      <span className="ql-formats">
        <button className="ql-list" value="ordered"></button>
        <button className="ql-list" value="bullet"></button>
        <button className="ql-indent" value="-1"></button>
        <button className="ql-indent" value="+1"></button>
      </span>
      <span className="ql-formats">
        <select className="ql-align" defaultValue={'left'}></select>
      </span>
      <span className="ql-formats">
        <button className="ql-script" value="sub"></button>
        <button className="ql-script" value="super"></button>
      </span>
      <span className="ql-formats">
        <button className="ql-link"></button>
        <button className="ql-image"></button>
      </span>
    </div>
  );
};
export default QuillEditor;
