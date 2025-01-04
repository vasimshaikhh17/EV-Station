// import { ConnectDB } from "@/lib/config/db";
// import StationModel from "@/lib/models/StationModel";
// import { NextResponse } from "next/server";

// export async function GET(request, { params }) {
//   await ConnectDB(); 
//   const { stationId } = params; 

//   try {
//     const station = await StationModel.findById(stationId);
//     if (!station) {
//       return NextResponse.json({ error: "Station not found" }, { status: 404 });
//     }
//     return NextResponse.json(station);
//   } catch (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

// export async function PUT(request, { params }) {
//   await ConnectDB(); 
//   const { stationId } = params; 
//   const data = await request.json();

//   try {
//     const updatedStation = await StationModel.findByIdAndUpdate(
//       stationId,
//       { $set: data },
//       { new: true }
//     );
//     if (!updatedStation) {
//       return NextResponse.json({ error: "Station not found" }, { status: 404 });
//     }
//     return NextResponse.json(updatedStation);
//   } catch (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

// export async function DELETE(request, { params }) {
//   await ConnectDB(); 
//   const { stationId } = params; 

//   try {
//     const deletedStation = await StationModel.findByIdAndDelete(stationId);
//     if (!deletedStation) {
//       return NextResponse.json({ error: "Station not found" }, { status: 404 });
//     }
//     return NextResponse.json({ msg: "Station deleted successfully" });
//   } catch (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }