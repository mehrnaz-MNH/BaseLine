import React from "react";
import { BsArrowUpRight } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";

interface Props {
  StepNumber: number;
  CardName: string;
  isDone: boolean;
  navTo: () => void;
}

const Card: React.FC<Props> = ({ StepNumber, CardName, isDone, navTo }) => {
  return (
    <div className="mt-6 flex min-h-fit flex-row rounded-[24px] bg-[#000000] p-4 text-[#3D3D3D] hover:bg-[#00FFD1] hover:text-black">
      <div className="grid w-full grid-cols-3">
        <div className="col-span-2">
          {!isDone && (
            <p className={`text-[13px] font-bold text-[#282828]`}>
              STEP {StepNumber}
            </p>
          )}

          <p
            className={`font-bold ${
              isDone ? "text-[20px] text-white" : "text-[28px]"
            }`}
          >
            {CardName}
          </p>
        </div>
        <div className="col-span-1 flex items-start justify-end">
          <button onClick={navTo}>
            {isDone ? (
              <FaCheck className="text-xl text-[#00FFD1]" />
            ) : (
              <BsArrowUpRight size={27} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
