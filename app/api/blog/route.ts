import { NextRequest, NextResponse } from "next/server";
import connectDB from "@utils/db";
import Blog from "@models/Blog";


// get all project list
export const GET = async (req: NextRequest) => {
  const searchQuery = req.nextUrl.searchParams.getAll("search");
  const tag = req.nextUrl.searchParams.get("tag");

  try {
    await connectDB();
    if (searchQuery?.length) {
      const project: object[] = await Blog.find({
        title: { $in: searchQuery },
      });
      return new NextResponse(JSON.stringify(project), { status: 200 });
    } else if (tag) {
      const project: object[] = await Blog.find({
        tag: tag,
      });
      return new NextResponse(JSON.stringify(project), { status: 200 });
    } else {
      const project: object[] = await Blog.find();
      return new NextResponse(JSON.stringify(project), { status: 200 });
    }
  } catch (error: any) {
    console.error(error.message);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};

// add new project
export const POST = async (req: Request) => {
  const {
  
    title,
    description,
    thumbnail,
   
    tags,
  } = await req.json();

  try {
    await connectDB();
    const project = new Blog({
      title,
      description,
     
   
      
      tags,
    });
    const addProject = await project.save();
    return NextResponse.json(addProject, { status: 201 });
  } catch (error: any) {
    console.error(error.message);
    if (error.name === "ValidationError") {
      return NextResponse.json({ error: error.message }, { status: 422 });
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
