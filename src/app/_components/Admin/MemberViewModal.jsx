import React from "react";
import {Icon} from "@iconify/react"

function MemberViewModal({member,handleModal}) {
  return (
    <div className="fixed bg-[#00000080] h-full w-full top-0 left-0">
      <div className="w-[50%] bg-white rounded-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
        <div className="p-5 h-[680px] overflow-y-auto">
          <div className="flex justify-between">
            <div className="text-2xl font-semibold text-primary">
              સભ્ય ની માહિતી 
            </div>
            <Icon
              icon="carbon:close-filled"
              className="text-3xl text-primary cursor-pointer"
              onClick={handleModal}
            />
          </div>
          <div className="w-fulltext-primary text-lg font-semibold space-y-2 pt-5">
            <p >
              નામ :-{" "}
              <span className="font-normal text-[#144F0FB3] break-words">
                {member?.name}
              </span>
            </p>
            <p>
              સભ્ય સાથે સબંધ :-{" "}
              <span className="font-normal text-[#144F0FB3] break-words">
                {member?.relationToMainPerson}
              </span>
            </p>
            <p>
              પરણીત / બિનપરણીત :-{" "}
              <span className="font-normal text-[#144F0FB3] break-words">
                {member?.isMarried ? "પરણીત" : "બિનપરણીત"}  
              </span>
            </p>
            <p>
              જન્મતારીખ :-{" "}
              <span className="font-normal text-[#144F0FB3] break-words">
              {member?.dob?.split("T")[0]?.split("-").reverse().join("-")}
              </span>
            </p>
            <p>
              મોસાળ શાખ :-
              <span className="font-normal text-[#144F0FB3] break-words">
                {member?.maternalSurname}
              </span>
            </p>
            <p>
              અભ્યાસ :-
              <span className="font-normal text-[#144F0FB3] break-words">
              {member?.education}

              </span>
            </p>
            <p>
              વ્યવસાય નું સરનામું :-{" "}
              <span className="font-normal text-[#144F0FB3] break-words">
                {member?.occupationAddress}
              </span>
            </p>
            <p>
              રહેણાક નું સરનામું :-{" "}
              <span className="font-normal text-[#144F0FB3] break-words">
          
                {member?.residentAddress}
              </span>
            </p>
            <p>
              મોબાઈલ નંબર :-{" "}
              <span className="font-normal text-[#144F0FB3] break-words">
                {member?.mobile}
              </span>
            </p>
            <p>
              બ્લડ ગુપ :-{" "}
              <span className="font-normal text-[#144F0FB3]">
              {member?.bloodGroup}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemberViewModal;
