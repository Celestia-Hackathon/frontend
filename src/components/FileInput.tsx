import { useCallback, useEffect, useRef, useState } from "react"
import { DropzoneState, useDropzone } from "react-dropzone";
import { Upload } from 'lucide-react';
import Card  from "./Card";
import { User } from "@/utils/types";
import { Button } from "./ui/button";

interface InputProps {
    dropzone: DropzoneState
}

interface HasFileProps {
    user: User,
    file?: string,
    // removeFile: () => void
}

export default function FileInput({users} : {users: User[]}) {
    const [file, setFile] = useState<string | null>(null);

    const onDrop = useCallback((files : File[]) => {
        console.log(files[0]);
        setFile(URL.createObjectURL(files[0]));
    }, [])

    /* const removeFile = useCallback(() => {
        setFile(null);
    }, [file]) */

    const dropzone = useDropzone({
        onDrop,
        accept: {
            'image/*' : ['.jpeg', '.png']
        }
    })

    if(file) return <HasFile user={users[0]} file={file} /* removeFile={removeFile} *//>;

    return <Input dropzone={dropzone}/>;
}

const Input = ({dropzone} : InputProps) => {
    const { getRootProps, getInputProps, isDragActive } = dropzone;

    return(
        <div 
            className={
                `lg:my-auto mt-12 h-72 lg:w-[30vw] px-12 rounded-lg border-dashed border-4 border-secondary hover:border-foreground hover:bg-secondary transition-all duration-700
                flex flex-col items-center justify-center
                ${isDragActive ? 'bg-secondary border-primary' : ''}`
            }
            {...getRootProps()}
        >
            <label htmlFor="dropzone-file" className="cursor-pointer w-full h-full">
                <div className="flex flex-col items-center justify-center pt-5 pb-6 w-full h-full">
                    <Upload className='w-10 h-10 mb-3' color={`${isDragActive ? 'hsl(var(--accent))' : 'hsl(var(--primary))'}`}/>
                    {isDragActive ? 
                        <p className="mb-2 text-base text-foreground font-bold">Release to upload</p>
                        : 
                        <>
                            <p className="mb-2 text-base text-foreground">
                                <span className="font-bold">Click to upload</span> or drag files here. 
                            </p>
                            <p className="text-sm">Image files only.</p>    
                        </>
                    }
                </div>
            </label>
            <input {...getInputProps()}  className="hidden" />
        </div>
    )
}

const HasFile = ({ user, file }: HasFileProps) => {
    const [description, setDescription] = useState<string>("");
    const textAreaRef = useRef(null);

    const handleChange = (event : any) => {
        setDescription(event.target.value)
    }

    useEffect(() => {
        (textAreaRef as any).current.style.height = "auto"; 
        (textAreaRef as any).current.style.height = (textAreaRef as any).current.scrollHeight + "px";
    }, [description])

    return(
        <div className="w-full px-6 py-2 ">
            <div className="flex flex-col items-center">
                <p className="text-lg font-bold">Post preview</p>
                <div className="w-full">
                    <Card 
                        userId={user.userId} 
                        userName={user.userName} 
                        userImg={user.avatarImg} 
                        postImg={file as string} 
                        description={description} 
                        likes={["1", "2", "3"]}                        
                    />
                </div>
                <textarea
                    className="bg-background resize-none w-full h-[20vh] px-4 py-2 mt-4 outline-0 border-2 border-secondary" 
                    placeholder="Write a post description" 
                    value={description} 
                    onChange={handleChange} 
                    name=""
                    id="post-description"
                    rows={6}
                    ref={textAreaRef}
                />
                <Button className="mt-8" variant="follow" >Publish</Button>
            </div>
        </div>
    )
}