import DummyHeader from "@/components/DummyHeader";
import FileInput from "@/components/FileInput";
import { User } from "@/utils/types";

export default function New({users} : {users: User[]}) {
    const onSubmit = () => {
        
    }

    // const [option, setOption] = useState("posts")

    return (
        <div className="flex lg:justify-between lg:pt-2 mb-16 justify-center items-center outline-none">
            <DummyHeader />
            <div className="flex flex-col items-center w-full lg:w-[35vw]">
                <form onSubmit={onSubmit} className="w-full h-full flex justify-center">
                    <FileInput users={users}/>
                </form>
            </div>
            <DummyHeader />
        </div>
    )
}