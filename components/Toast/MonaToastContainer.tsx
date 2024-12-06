import { Bounce, ToastContainer } from 'react-toastify';

type Props = {};

const MonaToastContainer = (props: Props) => {
  return (
    <ToastContainer
      position="top-center"
      autoClose={1000}
      hideProgressBar={true}
      newestOnTop={false}
      closeOnClick
      closeButton={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="transparent"
      transition={Bounce}
    />
  );
};

export default MonaToastContainer;
