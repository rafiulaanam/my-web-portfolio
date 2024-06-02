"use client";

import Button from "./Button";
import Input from "./Input";
import Textbox from "./Textbox";
import Typography from "./Typography";
import { ChangeEvent, RefObject } from "react";
import { TBlog } from "@app/dashboard/blogs/add-blog/blog";

type TAddEditForm = {
  isLoading: boolean;
  handleSubmit: (e: ChangeEvent<HTMLFormElement>) => Promise<void>;
  actionText: string;
  statusMessage: {
    variant: "error" | "success";
    message: string;
  } | null;
  projectData?: TBlog | null;
  formRef: RefObject<HTMLFormElement>;
};

const AddEditFormBlog = ({
  isLoading,
  handleSubmit,
  actionText,
  statusMessage,
  projectData,
  formRef,
}: TAddEditForm) => {
  return (
    <div className="w-full my-6 max-w-xl p-4 bg-primary-100 dark:bg-primary-900 shadow-md rounded-lg">
      <form
        className="w-full flex flex-col gap-4 "
        onSubmit={handleSubmit}
        ref={formRef}
      >
        <Input
          type="text"
          name="title"
          label="Title"
          defaultValue={projectData?.title}
          required
        />
        <Textbox
          name="description"
          label="Description"
          defaultValue={projectData?.description}
          required
        />
        
        <Input
          type="text"
          name="tags"
          label="Demo Link"
          defaultValue={projectData?.tags}
        />
      
    
        <div className="flex justify-end gap-4 items-center mt-4">
          <Button type="reset" title="Reset" variant="danger">
            Reset
          </Button>
          <Button
            type="submit"
            title={actionText}
            variant={"primary"}
            disabled={isLoading}
          >
            {isLoading ? "Please wait..." : actionText}
          </Button>
        </div>
        {statusMessage ? (
          <Typography
            variant={statusMessage.variant}
            className="my-4 text-center dark:bg-primary-200"
          >
            {statusMessage.variant === "error" ? "❌" : "✅"}{" "}
            {statusMessage.message}
          </Typography>
        ) : null}
      </form>
    </div>
  );
};

export default AddEditFormBlog;
