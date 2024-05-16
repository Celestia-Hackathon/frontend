import DummyHeader from "@/components/DummyHeader";
import { Quest } from "@/utils/types";
import QuestCard from "@/components/QuestCard";

export default function Quests({ quests }: { quests: Quest[] }) {
    return (
        <div className="flex lg:justify-between lg:pt-2 mb-16 outline-none overflow-hidden">
            <DummyHeader />
            <div className="flex flex-col items-center w-full lg:w-[35vw]">
                <div className="sticky py-4 top-0 z-10 bg-background">
                    <h1 className="text-2xl font-bold text-center">Your Quests</h1>
                </div>
                
                <div className="pt-2 flex flex-col items-center w-full h-full bg-background justify-start overflow-x-auto lg:w-full">
                    {quests.map((quest, index) => (
                        <QuestCard key={index} quest={quest} />
                    ))}
                </div>
            </div>
            <DummyHeader />
        </div>
    );
}
