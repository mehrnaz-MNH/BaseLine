import React from "react";
import { BsArrowUpRight } from "react-icons/bs";

interface Props {
  StepNumber: number;
  CardName: string;
  navTo: () => void;
}

const Card: React.FC<Props> = ({ StepNumber, CardName, navTo }) => {
  return (
    <div className="mt-6 flex min-h-[136px] min-w-[312px] flex-row rounded-[24px] bg-[#000000] p-4 text-[#3D3D3D] hover:bg-[#00FFD1] hover:text-black">
      <div className="grid w-full grid-cols-3">
        <div className="col-span-2">
          {" "}
          {/* Takes 70% width */}
          <p className="text-[13px] font-bold text-[#282828]">
            STEP {StepNumber}
          </p>
          <p className="text-[28px] font-bold">{CardName}</p>
        </div>
        <div className="col-span-1 flex items-start justify-end">
          {" "}
          {/* Align arrow to the right */}
          <button onClick={navTo}>
            <BsArrowUpRight size={27} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
