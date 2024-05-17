"use client"

import { useNavigate } from "react-router-dom"
import { Plus, Store, Pen } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function NewPostBtn() {

    const navigator = useNavigate()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="rounded-full">
                <Button variant='secondary' className={`flex p-2 items-center rounded-full`}>
                    <Plus />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="rounded-full min-w-1">
                <DropdownMenuItem>
                    <Button variant='secondary' className="flex p-0 bg-transparent items-center rounded-full" onClick={() => navigator("/new")}>
                        <Pen />
                        {/* <p>Create Post</p> */}
                    </Button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Button variant='secondary' className="flex p-0 bg-transparent items-center rounded-full" onClick={() => navigator("/new")}>
                        <Store />
                        {/* <p>Post NFT</p> */}
                    </Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
