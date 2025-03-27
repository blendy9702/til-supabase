"use client";
// SCSS
import styles from "@/components/common/dialog/MarkdownDialog.module.scss";
import { Checkbox } from "@/components/ui/checkbox";
// Markdown
import MDEditor from "@uiw/react-md-editor";
// shadcn/ui
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import LabelCalendar from "../calendar/LabelCalendar";
import { useState } from "react";
import { toast } from "sonner";
import { createTodo } from "@/app/actions/todos-action";

function MarkdownDialog() {
  // 다이얼로그 Props
  const [open, setOpen] = useState<boolean>(false);
  // 에디터의 제목/본문 내용
  const [title, setTitle] = useState<string | undefined>("");
  const [content, setContent] = useState<string | undefined>("");

  // todo 작성
  const onSubmit = async () => {
    if (!title || !content) {
      toast.error("부정적인! 입력하다 항목.", {
        description: "입력하다 제목 또는 내용",
        duration: 3000,
      });
      return;
    }

    // 서버 액션 실행하기
    const { data, error, status } = await createTodo({
      content,
      title,
    });
    if (error) {
      toast.error("실패하다 등록 :(", {
        description: `Error ${error.message}`,
        duration: 3000,
      });
      return;
    }

    toast.success("긍정적인!", {
      description: "등록되다 글이 supabase",
      duration: 3000,
    });

    // 창닫기
    setOpen(false);
    setTitle("");
    setContent("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <span className="flex justify-center w-full font-normal text-gray-400 hover:text-gray-500 cursor-pointer">
          Add Content
        </span>
      </DialogTrigger>
      <DialogContent className="max-w-fit min-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            <div className={styles.dialog_titleBox}>
              <Checkbox className="w-5 h-5" />
              <input
                type="text"
                placeholder="Write a title for your board"
                className={styles.dialog_titleBox_title}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </DialogTitle>
          <div className={styles.dialog_calendarBox}>
            <LabelCalendar label="From" required={false} />
            <LabelCalendar label="To" required={false} />
          </div>
          <Separator />
          {/* 마크다운 입력 영역 */}
          <div className={styles.dialog_markdown}>
            <MDEditor height={"80%"} value={content} onChange={setContent} />
          </div>
        </DialogHeader>
        <DialogFooter>
          <div className={styles.dialog_buttonBox}>
            <Button
              variant={"ghost"}
              className="font-normal text-gray-400 hover:bg-gray-50 hover:text-gray-500"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="font-normal border-orange-500 bg-orange-400 text-white hover:bg-orange-500 hover:text-white"
              onClick={onSubmit}
            >
              Save
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default MarkdownDialog;
