# file 관련

## action 관련

### 1. 파일 처리

- blog-storage-action.ts

```ts
"use server";

import { createServerSideClient } from "@/lib/supabase/server";

// 에러 타입에 대해서 파악하기
function handleError(error: unknown) {
  if (error) {
    console.error(error);
    throw error;
  }
}

// 파일 업로드
export async function uploadFile(formData: FormData): Promise<{
  id: string;
  path: string;
  fullPath: string;
} | null> {
  try {
    const supabase = await createServerSideClient();
    // getUser()를 사용하여 인증된 사용자 정보 가져오기
    // const {
    //   data: { user },
    //   error: userError,
    // } = await supabase.auth.getUser();

    // if (userError || !user) {
    //   console.error("인증된 사용자가 아닙니다.");
    //   return null;
    // }

    const file = formData.get("file") as File;
    // 파일 이름에 사용자 ID를 포함시켜 고유성 보장
    const fileExt = file.name.split(".").pop();

    // 인증 과정을 거치고 나면 사용자 ID 를 이용해서 파일을 생성한다.
    // const fileName = `${user.id}_${Date.now()}.${fileExt}`;
    const fileName = `${"tester"}_${Date.now()}.${fileExt}`;

    // upsert : insert 와 update 를 동시에 처리할 수 있는 옵션
    const { data, error } = await supabase.storage
      .from(process.env.NEXT_PUBLIC_STORAGE_BLOG_BUCKET as string)
      .upload(fileName, file, { upsert: true });

    if (error) {
      console.log("Error : ", error.message);
      handleError(error);
      return null; // 에러 발생 시 null 반환
    }

    return data;
  } catch (error) {
    handleError(error);
    return null;
  }
}

// supabas에서 파일 삭제
export async function deleteFile(fileName: string) {
  const supabase = await createServerSideClient();

  // 파일 삭제시 파일명을 배열에 요소로 추가해서 삭제한다.
  const { data, error } = await supabase.storage
    .from(process.env.NEXT_PUBLIC_STORAGE_BLOG_BUCKET as string)
    .remove([fileName]);

  handleError(error);

  return data;
}
```

## 에디터 관련

- delete 와 backspace 키보드 대한 처리를 진행
- 작성 중인 내용에서 img 태그의 src 에 담긴 글자를 분석해서 파일명을 파악
- 발견한 파일명 문자열을 action 의 deleteFile(파일명)을 전달해야 함.
- create-editor.tsx
