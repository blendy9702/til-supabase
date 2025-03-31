"use client";

import { deleteBlog, getBlogId } from "@/app/actions/blog-action";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const router = useRouter();
  // 무조건 id string 입니다.
  const { id } = useParams();
  const [title, setTitle] = useState<string | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const [content, setContent] = useState<string | null>(null);
  const fetchGetBlogId = async (_id: string) => {
    const { data, error, status } = await getBlogId(Number(_id));
    console.log(data);
    // 타입 가드
    if (data) {
      setTitle(data.title);
      setDate(data.created_at);
      setContent(data.content);
    }
  };

  // 내용 삭제 : 이미지도 삭제
  const deleteContent = async () => {
    console.log("삭제");
    const { error, status } = await deleteBlog(Number(id));
    if (!error) {
      router.push("/blog");
    }
  };
  useEffect(() => {
    fetchGetBlogId(id as string);
  }, []);
  return (
    <div className="w-[920px] h-screen bg-[#f9f9f9] border-r border-[#d6d6d6] flex items-start justify-center">
      <div className="flex flex-col w-full p-4">
        <h1 className="w-full text-center text-xl mb-4 font-bold">Blog Read</h1>
        <div className="space-y-4">
          <div className="text-lg font-semibold mb-2">{title}</div>
          <div className="text-gray-600 text-sm mb-4">
            {date?.split("T")[0]}
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: content || "" }}
            className="editor ProseMirror"
          ></div>
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <Button
            onClick={() => router.push(`/blog/edit/${id}`)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors cursor-pointer"
          >
            수정
          </Button>
          <Button
            onClick={() => deleteContent()}
            className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors cursor-pointer"
          >
            삭제
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
