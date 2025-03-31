"use client";
import { BlogsRow, deleteBlog, getBlogs } from "@/app/actions/blog-action";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function Page() {
  const router = useRouter();
  const [blogs, setBlogs] = useState<BlogsRow[] | null>([]);
  const fetchGetBlogs = async () => {
    const { data, error, status } = await getBlogs();
    if (data) {
      setBlogs(data);
    }
  };

  const deleteContent = async (id: number) => {
    const { error, status } = await deleteBlog(id);
    if (!error) {
      fetchGetBlogs();
    }
  };

  useEffect(() => {
    fetchGetBlogs();
  }, []);
  return (
    <div className="flex w-[920px] h-screen bg-[#f9f9f9] border-r border-[#d6d6d6] items-start justify-center">
      <div className="w-full p-5">
        <h1 className="w-full text-center item-center p-2 bg-slate-100 rounded-md shadow-sm text-2xl font-bold">
          Blog List
        </h1>
        <div className="flex flex-col gap-2 w-full items-center justify-center p-2">
          {blogs &&
            blogs.map((item) => (
              <div
                key={item.id}
                className="flex w-full items-center gap-4 p-2 rounded-lg border-gray-200 shadow-sm bg-white my-2"
              >
                <p className="flex-1 text-sm font-medium cursor-pointer">
                  <Link href={`/blog/${item.id}`} className="cursor-pointer">
                    {item.title}
                  </Link>
                </p>
                <div>
                  <Button
                    variant={"ghost"}
                    size={"icon"}
                    className="cursor-pointer"
                    onClick={() => deleteContent(item.id)}
                  >
                    <Trash className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            ))}
        </div>
        <div>
          <Button
            variant={"outline"}
            onClick={() => router.push("/blog/create")}
          >
            생성
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Page;
