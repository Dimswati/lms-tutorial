"use client"

import * as z from "zod"
import axios from "axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"


import { Button } from "@/components/ui/button"
import { File, ImageIcon, Loader2, Pencil, PlusCircle, X } from "lucide-react"
import { useState } from "react"

import toast from "react-hot-toast"
import { cn } from "@/lib/utils"
import { Attachment, Course } from "@prisma/client"
import Image from "next/image"
import { FileUpload } from "@/components/file-upload"

const formSchema = z.object({
  url: z.string().min(1)
})

interface AttachmentFormProps {
  initialData: Course & { attachments: Attachment[] }
  courseId: string
}

const AttachmentForm = ({ initialData, courseId }: AttachmentFormProps) => {


  const [isEditing, setIsEditing] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const toggleEdit = () => setIsEditing(current => !current)

  const router = useRouter()

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/attachments`, values)
      toast.success("Course updated")
      toggleEdit()
      router.refresh()
    } catch {
      toast.error("Something went wrong")
    }
  }

  const onDelete = async(id: string) => {
    try {
      setDeletingId(id)
      await axios.delete(`/api/courses/${courseId}/attachments/${id}`)
      toast.success("Attachment deleted")
      router.refresh()
    } catch(err) {
      toast.error("Someting went wrong")
    } finally {
      setDeletingId(null)
    }
  } 
  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course Attachments
        <Button variant={'ghost'} onClick={toggleEdit}>
          {isEditing && (
            <>Cancel</>
          )}
          {!isEditing && (
            <>
              <PlusCircle className="h-4 w-4 mr-4" />
              <>Add a file</>
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <>
          {initialData.attachments.length === 0 && (
            <p className="text-sm mt-2 text-slate-500 italic">
              No attachments yes
            </p>
          )}
          {initialData.attachments.length > 0 && (
            <div className="space-y-2">
              {initialData.attachments.map(attachment => (
                <div className="flex items-center p-3 w-full bg-sky-200 border text-sky-700 rounded-md" key={attachment.id}>
                  <File className="h-4 w-4 mr-2 flex-shrink-0"/>
                  <p className="text-xs line-clamp-1">{attachment.name}</p>
                  {deletingId === attachment.id && (
                    <div className="ml-auto">
                      <Loader2 className="h-4 w-4 animate-spin"/>
                    </div>
                  )}
                  {deletingId !== attachment.id && (
                    <button className="ml-auto hover:opacity-75 transition" onClick={() => onDelete(attachment.id)}>
                      <X className="h-4 w-4"/>
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
      {isEditing && (
        <div>
          <FileUpload endpoint="courseAttachment" onChange={(url) => {
            if(url) {
              onSubmit({ url })
            }
          }}/>
          <div className="text-xs text-muted-foreground mt-4">
            Add anything your student might need to complete the course
          </div>
        </div>
      )}
    </div>
  )
}

export default AttachmentForm