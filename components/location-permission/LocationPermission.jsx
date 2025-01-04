"use client";
import Image from "next/image";
import React from "react";

const LocationPermission = () => {
    const requestLocationPermission = () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              // Handle success: position.coords contains the location data
              console.log("Location accessed:", position.coords);
              // You can now use the location data as needed
            },
            (error) => {
              // Handle error
              switch (error.code) {
                case error.PERMISSION_DENIED:
                  console.log("User denied the request for Geolocation.");
                  break;
                case error.POSITION_UNAVAILABLE:
                  console.log("Location information is unavailable.");
                  break;
                case error.TIMEOUT:
                  console.log("The request to get user location timed out.");
                  break;
                case error.UNKNOWN_ERROR:
                  console.log("An unknown error occurred.");
                  break;
                default:
                  console.log("An unexpected error occurred.");
              }
            }
          );
        } else {
          console.log("Geolocation is not supported by this browser.");
        }
      };
  return (
    <div className="w-full flex flex-col justify-between  items-center">
      <div>
        <Image src="/ev-bike.webp" width={300} height={310} alt="" />
        <div className="flex flex-col justify-center items-center text-center px-7">
          <h3 className="text-xl font-semibold">
            Location Permission not enabled
          </h3>
          <p className="text-md mt-3">
            Sharing Location permission hepls us find you the best-fast &
            Accurate Ev Station{" "}
          </p>
        </div>
      </div>{" "}
      <div className="mt-14">
        <button onClick={requestLocationPermission} className="btn2">Allow Permission</button>
        {/* <button className='btn2'>Enter pickup manually</button> */}
      </div>
    </div>
  );
};

export default LocationPermission;

