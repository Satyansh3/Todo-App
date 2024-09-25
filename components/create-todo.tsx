"use client"
import {Button} from "@/components/ui/button"
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
  import { mutate } from "swr"

  import { todoSchema, type TodoSchema } from "@/lib/zod"
  

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { useState } from "react"
import TodoForm from "./todoform"
  

export default function CreateTodo() {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const[isDialogOpen, setDialogOpen] = useState(false);


    const form = useForm<TodoSchema>({
        resolver: zodResolver(todoSchema),
        defaultValues: {
            title: "",
            description: "",
            isCompleted: false,
        }
    })
    const onSubmit = async (data: TodoSchema) => {
        setIsSubmitting(true);
        try {
            const response = await fetch("/api/todos", {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(data)
            });

            const responseData = await response.json();

            if(!response.ok){
                throw new Error(
                    responseData.message || "Failed to create todo"
                )
            }

            form.reset();
            setDialogOpen(false);
            mutate("/api/todos")
            setErrorMessage("");
        } catch (error) {
            console.error("Error creating todo:", error);
            const errorMessage = error instanceof Error 
                                    ? error.message
                                    : "An unexpected error occured"
            setErrorMessage(errorMessage)
        } finally{
            setIsSubmitting(false);
        }
    }
    
    return(
        <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
                <Button>Add Todo</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425-px] bg-white">
                <DialogHeader>
                    <DialogTitle>
                        Create New Todo
                    </DialogTitle>
                </DialogHeader>
                {errorMessage && (
                    <div className="text-red-500 text-sm-mb-4">
                        {errorMessage}
                    </div>
                )}
                <TodoForm
                    defaultValues={{
                        title: "",
                        description: "",
                        isCompleted: false,
                    }}
                    onSubmit={onSubmit}
                    submitButtonText="Create"
                    isSubmitting={isSubmitting}
                />
            </DialogContent>
        </Dialog>
    )
}