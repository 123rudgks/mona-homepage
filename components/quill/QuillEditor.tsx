'use client';
import '@/app/custom-quill.css';
import { APIResponse } from '@/types/globals.types';
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
            .catch((err) => { });
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

const getUploadedImgUrl = async (formData: FormData): Promise<APIResponse<string[]>> => {
  const response = await authFetch('/api/upload', {
    method: 'POST',
    body: formData,
  });
  if (!response || !response.ok) {
    throw new Error('Failed to upload images');
  }
  return response.json();
};

const changeImgSrc = async (html: string): Promise<string> => {
  // DOM 파싱을 위한 임시 div 생성
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html

  // 모든 img 태그 선택
  const imgElements = tempDiv.getElementsByTagName('img');
  const formData = new FormData();
  const imgToUpdate: HTMLImageElement[] = [];

  // 이미지 처리 및 formData 구성
  await Promise.all(
    Array.from(imgElements).map(async (img) => {
      const src = img.getAttribute('src');
      // src가 없거나, 이미 업로드된 이미지(temp서버 또는 실제 이미지 서버 모두 )일 경우 temp서버로 업로드시 제외
      if (!src || src.startsWith('https://monalec-dev.s3.ap-northeast-2.amazonaws.com/images/')) {
        return;
      }
      try {
        // 이미지 src로부터 파일 객체 생성
        const response = await fetch(src);
        const blob = await response.blob();
        formData.append('images', blob);
        imgToUpdate.push(img);

      } catch (error) {
        console.error('Error processing image:', error);
      }
    }
    ));

  if (imgToUpdate.length > 0) {
    try {
      // 이미지 파일들 업로드
      const response = await getUploadedImgUrl(formData);
      if (response.data && Array.isArray(response.data)) {
        // 업로드된 이미지 주소로 교체
        response.data.forEach((newSrc: string, index: number) => {
          if (imgToUpdate[index]) {
            imgToUpdate[index].setAttribute('src', newSrc);
          }
        })
      }

    }
    catch (error) {
      console.error('Error uploading images:', error);
      throw error;
    }
  }
  return tempDiv.innerHTML;

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
