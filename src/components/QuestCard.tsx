import { useState, useEffect } from 'react';
import { Quest } from '@/utils/types';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import ConfettiExplosion from 'react-confetti-explosion';
import { useToast } from "@/components/ui/use-toast"
import chatspace_token from "@/assets/chatspcae_token_v2.png";

export default function QuestCard({ quest }: { quest: Quest }) {
    const [expanded, setExpanded] = useState(false);
    const [isExploding, setIsExploding] = useState(false);
    const [isClaimed, setIsClaimed] = useState(false);
    const [progress, setProgress] = useState(0);

    const { toast } = useToast();

    const toggleExpansion = () => {
        setExpanded(!expanded);
    };

    useEffect(() => {
        const timer = setTimeout(() => setProgress(100), 500);
        return () => clearTimeout(timer);
    }, []);

    const claimReward = () => {
        if (progress === 100 && !isClaimed) {
            toast({
                title: `Congratulations on completing the quest!`,
                description: `You have been rewarded with ${reward} CAT's! 🎉`,
            });

            setIsExploding(true);
            setIsClaimed(true); // Disable the button
            setTimeout(() => {
                setIsExploding(false);
            }, 2000);
        }
    };

    const { questName, questDescription, reward, createdBy } = quest;

    return (
        <div className="border text-start bg-background border-gray-300 rounded-lg mb-4 w-[95%]">
            <div onClick={toggleExpansion} className="flex justify-between items-center py-2 px-3 h-[7.5vh] cursor-pointer">
                <h3 className="text-md font-lucky w-full">{questName}</h3>
                {/* <button
                    className="text-gray-600 hover:text-gray-800 focus:outline-none"
                >
                    {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button> */}
                <div className='px-3 py-1 text-nowrap flex items-center justify-start'>
                    <p className='mr-1 text-primary font-lucky text-sm'>{reward}</p>
                    <img src={chatspace_token} alt="token" className="w-7" />
                </div>
            </div>
            {expanded && (
                <>
                    <div className="my-1 justify-start px-3 flex flex-col gap-2">
                        <p className="text-gray-500">by: {createdBy}</p>
                        <p className="text-gray-500">{questDescription}</p>
                    </div>
                    <div className="flex justify-center">
                        <button
                            className={`px-3 w-full text-lg py-2 mt-2 rounded-b-lg text-primary ${progress === 100 && !isClaimed ? 'bg-accent hover:bg-accent-foreground focus:outline-none' : 'bg-gray-400 cursor-not-allowed'}`}
                            onClick={claimReward}
                            disabled={progress !== 100 || isClaimed}
                        >
                            {isExploding && <div className="relative top-0 bottom-0 left-0 right-0 flex justify-center items-center"><ConfettiExplosion force={0.4} particleCount={30} width={800} /></div>}
                            {isClaimed ? "Claimed" : progress === 100 ? `Claim your ${reward} CAT's now!!` : `Complete this Quest for ${reward} CAT's`}
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

