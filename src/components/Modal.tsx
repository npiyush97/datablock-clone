import { X } from 'lucide-react';
import { FC, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface ModalProps {
  isOpen: boolean;
  onChange: () => void;
  children: ReactNode;
}

const Modal: FC<ModalProps> = ({ isOpen, onChange, children }) => {
  return (
    <div className={twMerge(`${!isOpen && 'hidden'}`)}>
      <div className="bg-black/60 fixed inset-0 cursor-pointer z-30" onClick={onChange}></div>
      <div className="z-40 fixed drop-shadow-md top-[50%] left-[50%] max-h-full h-full md:h-auto md:max-h-[85vh] w-full md:w-[90vw] md:max-w-[600px] translate-x-[-50%] translate-y-[-50%] rounded-md bg-navy-600 p-4 focus:outline-none overflow-hidden overflow-y-auto border border-navy-500">
        <X
          className="absolute right-2 top-4 h-4 w-4 text-gray-500 cursor-pointer hover:bg-navy-100/10 transition"
          onClick={onChange}
        />
        {children}
      </div>
    </div>
  );
};

export default Modal;
