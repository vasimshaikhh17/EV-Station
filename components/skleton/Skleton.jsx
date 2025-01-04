import React from "react";

export const ListSkleton = ({ number }) => {
  return (
    <div>
      {[...Array(number)].map((_, index) => (
        <div
          key={index}
          class="px-3 py-3 border rounded items-center animate-pulse"
        >
          <div class="flex justify-center items-start">
            <div class="flex justify-between items-center gap-2">
              <span class="bg-gray-300 h-4 w-16 rounded"></span>
              <span class="bg-gray-300 h-4 w-4 rounded"></span>
              <span class="bg-gray-300 h-4 w-24 rounded"></span>
              <span class="bg-gray-300 h-4 w-4 rounded"></span>
              <span class="bg-gray-300 h-4 w-20 rounded"></span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};


export const MapSkleton = ()=>{
    return(
        <div class="p-4">
  <div class="w-full h-64 bg-gray-300 rounded-lg animate-pulse"></div>
</div>
    )
}