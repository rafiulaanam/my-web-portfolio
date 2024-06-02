"use client";

import AddEditForm from "@components/AddEditForm";
import AddEditFormBlog from "@components/AddEditFormBlog";
import Typography from "@components/Typography";
import { ChangeEvent, useRef, useState } from "react";

const AddProject = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    variant: "error" | "success";
    message: string;
  } | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleAdd = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setStatusMessage(null);
    try {
      if (formRef.current) {
        const formData = new FormData(formRef.current);
        const formDataObj = Object.fromEntries(formData.entries());
        const {
          title,
          description,
         
          tags,
        } = formDataObj;

        const res = await fetch(`/api/blog`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            title,
            description,
            
            tags,
          }),
        });
        if (!res.ok) {
          throw new Error("Failed to add project");
        }
        setStatusMessage({
          variant: "success",
          message: "Project added successfully",
        });
        e.target?.reset();
      }
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        setStatusMessage({ variant: "error", message: error.message });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="container ">
      <Typography size="h5/semi-bold" className="capitalize text-center">
        Add New Blog
      </Typography>
      <div className="flex justify-center ">
        <AddEditFormBlog
          isLoading={isLoading}
          actionText="Add Blog"
          statusMessage={statusMessage}
          handleSubmit={handleAdd}
          formRef={formRef}
        />
      </div>
    </main>
  );
};

export default AddProject;
