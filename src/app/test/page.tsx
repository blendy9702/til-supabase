"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { createTodos, getTodos } from "@/app/actions/test-action";
import { Button } from "@/components/ui/button";
import { queryClient } from "@/providers/ReactQueryProvider";

const Page = () => {
  const [testInput, setTestInput] = useState<string>("");
  // 데이터 가져오기
  const [isFetch, setIsFetch] = useState<boolean>(false);
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["unique"],
    queryFn: getTodos,
    retry: 3,
  });
  // 데이터 추가
  const createMutation = useMutation({
    mutationFn: async () => {
      if (testInput.trim() === "") {
        alert("할일을 등록해주세요");
        return;
      }
      await createTodos(testInput);
    },
    onSuccess: () => {
      setTestInput("");
      refetch();
    },
    onError: (error) => {
      console.log(error.message);
    },
    onSettled: () => {
      console.log("성공 실패 상관없이 실행");
    },
  });

  // mutation 비동기 작업 처리
  const mutation = useMutation({
    mutationFn: createTodos,
  });

  const handleAdd = async () => {
    try {
      const now = await mutation.mutateAsync("test");
      console.log("현재 데이터 : ", now);
      queryClient.refetchQueries({ queryKey: ["unique"] });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Test Todo</h1>
      <div>
        <Button onClick={() => handleAdd()}>테스트</Button>
      </div>
      <div>
        <input
          type="text"
          value={testInput}
          onChange={(e) => setTestInput(e.target.value)}
          className="border border-amber-400 rounded-md my-2"
        />
        <Button
          disabled={createMutation.isPending}
          onClick={() => createMutation.mutate()}
        >
          {createMutation.isPending ? "추가중..." : "할일 추가"}
        </Button>
      </div>
      <div>
        <button
          onClick={() => refetch()}
          className="border border-amber-400 rounded-md cursor-pointer"
        >
          다시호출
        </button>
      </div>
      {isLoading && <div>데이터 로딩중 ...</div>}
      {error && <div>Error : {error.message} </div>}
      {data && (
        <div>
          {data.map((item, index) => (
            <div key={index}>{item}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Page;
