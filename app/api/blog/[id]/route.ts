import { NextRequest, NextResponse } from "next/server";
import connectDB from "@utils/db";
import Project from "@models/Project";
import Blog from "@models/Blog";

// get project data by id
// /api/project/${id}
export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;

  try {
    if (!id) return;
    await connectDB();
    const project = await Blog.findById(id);
    return NextResponse.json(project, { status: 200 });
  } catch (error: any) {
    console.error(error.message);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};

// update existing project

// /api/project/${id}

export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  // const id = req.nextUrl.searchParams.get("id");
  const { id } = params;
  const {
    
    title,
    description,
   
    tags,
  } = await req.json();

  try {
    if (!id)
      return NextResponse.json(
        {
          error:
            "Project id required for update in path params, for eg. /api/project/${id}",
        },
        { status: 404 }
      );
    await connectDB();
    const projectExist = await Blog.findById(id);
    if (!projectExist) {
      return NextResponse.json(
        { error: "Project does not exit with this id" },
        { status: 404 }
      );
    }
    const updatedData = {
      title,
      description,
      
      tags,
    };
    const updateProject = await Blog.findByIdAndUpdate(
      id,
      { $set: updatedData },
      { new: true }
    );
    return NextResponse.json(updateProject, { status: 201 });
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
// delete existing project
export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  // const id = req.nextUrl.searchParams.get("id");
  const { id } = params;

  try {
    if (!id)
      return NextResponse.json(
        {
          error:
            "Project id required for delete in path params, for eg. /api/project/${id}",
        },
        { status: 404 }
      );
    await connectDB();
    const projectExist = await Blog.findById(id);
    if (!projectExist) {
      return NextResponse.json(
        { error: "Project does not exit with this id" },
        { status: 404 }
      );
    }

    await Project.findByIdAndDelete(id);
    return NextResponse.json(
      { message: `Project with id:${id} has been deleted successfully` },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error.message);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
