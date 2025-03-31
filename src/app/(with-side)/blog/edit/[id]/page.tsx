"use client";
import { BlogsRow, getBlogId } from "@/app/actions/blog-action";
import EditEditor from "@/components/editor/edit-editor";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState<BlogsRow | null>(null);

  const fetchGetBlogId = async (_id: string) => {
    const { data, error, status } = await getBlogId(Number(_id));
    if (data) {
      setBlog(data);
    }
  };

  useEffect(() => {
    fetchGetBlogId(id as string);
  }, []);

  return (
    <div className="w-[920px] h-screen bg-[#f9f9f9] border-r border-[#d6d6d6] flex items-start justify-center">
      {blog ? <EditEditor blog={blog} /> : "자료가 없습니다."}
    </div>
  );
};

export default Page;
