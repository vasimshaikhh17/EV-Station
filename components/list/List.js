import React from "react";
import { ListSkleton } from "../skleton/Skleton";

const List = () => {
  return (
    <>
      <div className="rounded bg-global text-white p-3 border flex justify-between">
        <h4 className="text-md font-semibold">Nearby Locations</h4>
        <div className="flex justify-between items-center">
          {/* <h4 className="text-sm">Call to Action </h4>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-3 h-3 ml-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 4.5l5.25 5.25M2.25 4.5l5.25-5.25M2.25 4.5h15.75M21.75 19.5l-5.25-5.25M21.75 19.5l-5.25 5.25M21.75 19.5H6"
            />
          </svg> */}
        </div>
      </div>
      <ListSkleton number={1}/>
      <div className="p-1 grid gap-1">
        <div className=" px-3 py-3 border rounded grid-col-1 items-center hover:shadow-md hover:scale-100 duration-300">
          <div className="flex justify-between items-start">
            <div className="flex justify-between items-center gap-2">
              <span className="text-sm">Name</span>
              <span className="text-sm">|</span>
              <span className="text-sm">Distance-3km</span>
              <span className="text-sm">|</span>
              <span className="text-sm">contact</span>
            </div>
            <button className="btn">
              Call
            </button>
          </div>
        </div>
       
      </div>
    </>
  );
};

export default List;
