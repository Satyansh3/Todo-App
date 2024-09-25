import CreateTodo from "@/components/create-todo";
import { Button } from "@/components/ui/button";
import TodoLust from "@/components/ui/todo-list";
import Image from "next/image";

export default function Home() {
  return(
    <div className="mx-w-7xl flex flex-col gap-10 mx-auto p-10">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Todos</h1>
        <CreateTodo />
      </div>
      <TodoLust />
    </div>
  );
}
