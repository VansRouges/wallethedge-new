import React from 'react';
import { Collapse } from 'react-collapse';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

interface AccordionItemsProps {
  open: boolean;
  toggle: () => void;
  title: string;
  desc: string;
}

const AccordionItems: React.FC<AccordionItemsProps> = ({ open, toggle, title, desc }) => {
  return (
    <div className='pt-[10px]'>
      <div 
        className='bg-blue-500 py-[25px] px-[50px] flex justify-between items-center cursor-pointer' 
        onClick={toggle}
      >
        <p className={`text-[22px] font-semibold ${open ? "text-white" : "text-blue-900"}`}>
          {title}
        </p>
        <div className={`${open ? "text-white" : "text-blue-900"} text-[30px]`}>
          {open ? <AiOutlineMinus /> : <AiOutlinePlus />}
        </div>
      </div>

      <Collapse isOpened={open}>
        <div className="px-[50px] py-[30px] bg-white font-light text-base">
          {desc}
        </div>
      </Collapse>
    </div>
  );
};

export default AccordionItems;