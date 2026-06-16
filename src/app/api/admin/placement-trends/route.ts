import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import Application from "@/models/Application";

export async function GET() {
  try {
    await connectDB();

    const trends =
      await Application.aggregate([
        {
          $group: {
            _id: {
              year: {
                $year: "$createdAt",
              },
              month: {
                $month: "$createdAt",
              },
            },
            count: {
              $sum: 1,
            },
          },
        },
        {
          $sort: {
            "_id.year": 1,
            "_id.month": 1,
          },
        },
      ]);

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const formatted =
      trends.map((item) => ({
        month:
          monthNames[
            item._id.month - 1
          ],
        applications:
          item.count,
      }));

    return NextResponse.json({
      success: true,
      trends: formatted,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}