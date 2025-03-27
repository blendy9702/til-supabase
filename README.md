# 추가보완

- todo-aciton.ts 변경

```ts
// Update 기능 id 한개
export async function updateTodoIdTitle(
  id: number,
  title: string,
  startDate: Date | undefined,
  endDate: Date | undefined
) {
  const supabase = await createServerSideClient();

  const { data, error, status } = await supabase
    .from("todos")
    .update({
      title: title,
      start_date: startDate?.toISOString(),
      end_date: endDate?.toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  return { data, error, status } as {
    data: TodosRow | null;
    error: Error | null;
    status: number;
  };
}
```

- /src/app/create/[id]/page.tsx

```tsx
// 타이틀 저장 함수
const handleSaveTitle = async () => {
  const { data, error, status } = await updateTodoIdTitle(
    Number(id),
    title,
    startDate,
    endDate
  );
};
```

```tsx
<LabelCalendar
  label="From"
  required={false}
  selectedDate={startDate}
  onDateChange={setStarDate}
/>
<LabelCalendar
  label="To"
  required={false}
  selectedDate={endDate}
  onDateChange={setEndDate}
/>
```

# jotai

- https://jotai.org
- https://tutorial.jotai.org/quick-start/intro

```bash
npm install jotai@latest --legacy-peer-deps
```

## Store 설정

- /src/app/store 폴더 생성
- /src/app/store/index.ts 생성

```ts
import { atom } from "jotai";
// 상태값 저장 구분용 변수
export const sidebarStateAtom = atom<string>("");
```

## Store 활용

- SideNavigation.tsx

```tsx
// jotai 상태 사용하기
const [sidebarState, setSideState] = useAtom(sidebarStateAtom);
```

```tsx
useEffect(() => {
  if (sidebarState !== "default") {
    fetchGetTodos();

    if (sidebarState === "delete") {
      router.push("/");
    }
  }
}, [sidebarState]);
```

## Store 갱신하기

- todo-action.ts

```ts
const { data, error, status } = await supabase
  .from("todos")
  .select("*")
  .order("id", { ascending: false });
```

- /src/app/create/[id]/page.tsx

```tsx
// jotai 상태 사용하기
const [sidebarState, setSideState] = useAtom(sidebarStateAtom);
```

```tsx
// Page 삭제 함수
const handleDeleteBoard = async () => {
  // console.log(id, "제거하라");
  const { error, status } = await deleteTodo(Number(id));
  if (!error) {
    setSideState("delete");
  }
};
```
