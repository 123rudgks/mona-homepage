import { ReactElement, useEffect, useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface Props {}
// Used to create multiple modals at the same time with different portal ID
function createWrapperAndAppendToBody(wrapperId: string) {
  const wrapperElement = document.createElement('div');
  wrapperElement.setAttribute('id', wrapperId);
  wrapperElement.setAttribute('style', 'position:absolute;z-index:100;top:0;');
  document.body.appendChild(wrapperElement);
  return wrapperElement;
}

const ModalPortal = ({
  children,
  wrapperId = 'modal-root',
}: {
  children: ReactElement;
  wrapperId?: string;
}) => {
  const [mounted, setMounted] = useState<boolean>(false);
  const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(
    null,
  );

  useLayoutEffect(() => {
    let element = document.getElementById(wrapperId);
    setWrapperElement(element);
    // if element is not found with wrapperId or wrapperId is not provided,
    // create and append to body
    if (!element) {
      element = createWrapperAndAppendToBody(wrapperId);
    }
    setWrapperElement(element);
  }, [wrapperId]);

  useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
    };
  }, []);

  // wrapperElement state will be null on the very first render.
  if (wrapperElement === null) return null;

  if (typeof window === 'undefined') return <></>;
  return mounted ? createPortal(children, wrapperElement) : <></>;
};

export default ModalPortal;
