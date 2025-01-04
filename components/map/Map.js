import React from "react";
import { useState, useEffect, useRef } from "react";

const Map = ({mapRef}) => {
  return (
    <div>
      <div
        id="map"
        ref={mapRef}
        style={{ height: "60vh", width: "100%" }}
        className="z-10"
      ></div>
    </div>
  );
};

export default Map;
