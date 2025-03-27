# test

## 1. 목록에서 Page 이동하기

- sideNavigation.tsx

```tsx
onClick={() => router.push(`/create/${item.id}`)}
```

## 2. Page에서 목록 스크롤 시키기

- /src/app/create/[id]/page.tsx
- `overflow-y-scroll` 추가

```tsx
<div className="flex flex-col items-center justify-start w-full h-full gap-4 overflow-y-scroll">
  {contents.map((item) => (
    <BasicBoard
      key={item.boardId}
      item={item}
      updateContent={updateContent}
      deleteContent={deleteContent}
    />
  ))}
</div>
```

- global.css 추가

```css
@layer base {
  * {
    @apply border-border outline-ring/50;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    scrollbar-width: none;
  }
  ::-webkit-scrollbar {
    display: none;
  }
  body {
    @apply bg-background text-foreground;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
}
```

## 3. progress 정리하기

- /src/app/create/[id]/page.tsx

```tsx
// Progress Bar 처리
const [completedCount, setCompletedCount] = useState<number>(0);
```

```tsx
const calcCompletedCount = () => {
  let count = 0;
  contents.forEach((item) => item.isCompleted === true && count++);
  console.log("count : ", count);
  setCompletedCount(count);
};
```

```tsx
<span className={styles.progressBar_status}>
  {completedCount} / {contents.length} completed!
</span>
```

### checkbox 처리 필요

- BasicBoard.tsx

```tsx
const [isCompleted, setIsCompleted] = useState<boolean>(item.isCompleted);
```

```tsx
<Checkbox
  className="w-5 h-5"
  checked={isCompleted}
  onCheckedChange={() => {
    item.isCompleted = !item.isCompleted;
    setIsCompleted(item.isCompleted);
    updateContent(item);
  }}
/>
```

- 체크 상태를 page > BasicBoard : MarkdownDialog : 업데이트 props 처리

- MarkdownDialog.tsx

```tsx
const [completedCount, setCompletedCount] = useState<number>(0);
const [totalCount, setTotalCount] = useState<number>(0);
```

```tsx
// contents 의 isCompleted 가 true 인 갯수 파악하기
const calcCompletedCount = (gogo: BoardContent[]) => {
  const arr = gogo.filter((item) => item.isCompleted === true);
  // console.log("count : ", arr.length);
  setCompletedCount(arr.length);
};
```

```tsx
<span className={styles.progressBar_status}>
  {completedCount} / {contents.length} completed!
</span>
```

- page 체크 업데이트 함수를 만듦
