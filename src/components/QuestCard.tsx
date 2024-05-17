import { useState, useEffect } from 'react';
import { Quest, User } from '@/utils/types';
// import { ChevronDown, ChevronUp } from 'lucide-react';
// import { Progress } from "@/components/ui/progress";
import ConfettiExplosion from 'react-confetti-explosion';
import { useToast } from "@/components/ui/use-toast"
import chatspace_token from "@/assets/chatspcae_token_v2.png";
import { addCatCoinToWallet, claimTokens } from '@/utils/contracts';
import { api } from '@/utils/api';

export default function QuestCard({ quest }: { quest: Quest }) {
    const { questName, questId, questDescription, reward, createdBy, completedBy } = quest;

    // consider that our user data is hardcoded for now, and that soon we can retrieve its data from localstorage
    const loggedInUser : User = JSON.parse(localStorage.getItem('user') || '{}');

    const [expanded, setExpanded] = useState(false);
    const [isExploding, setIsExploding] = useState(false);
    const [isClaimed, setIsClaimed] = useState(false);
    const [progress, setProgress] = useState(0);

    const { toast } = useToast();

    const toggleExpansion = () => {
        setExpanded(!expanded);
    };

    // useEffect(() => {
    //     const timer = setTimeout(() => setProgress(100), 500);
    //     return () => clearTimeout(timer);
    // }, []);

    //set isclaimed to true if the user has already completed the quest (that is, if my loggedInUser.questsId includes the questId)
    useEffect(() => {
        if (loggedInUser.questsId.includes(questId)) {
            setIsClaimed(true);
            console.log("Rewards claimed by user");
        }
    }, [questId, loggedInUser.questsId]);

    useEffect(() => {
        if (completedBy.includes(loggedInUser.userId)) {
            setProgress(100);
            console.log("Quest completed by user");
        }
    }, [questId, completedBy]);

    // const addRewardToUserWallet = async () => {
    //     // add tokens direto na wallet do user
    // }

    // function to claim the reward on the backend by acessing endpoint
    const claimReward = async () => {
        if (progress === 100 && !isClaimed) {
            try {
                const receipt = await claimTokens(reward);
                if(receipt && receipt == 1) {
                    await api.addQuestReward(loggedInUser.userId, quest.questId, reward);
                    await api.updateUserInfo(loggedInUser.wallet);
                    await addCatCoinToWallet();
                    toast({
                        title: `Congratulations on completing the quest!`,
                        description: `You have been rewarded with ${reward} CAT's! 🎉`,
                    });

                    // addRewardToUserWallet();
                    setIsExploding(true);
                    setIsClaimed(true); // Disable the button
                    setTimeout(() => {
                        setIsExploding(false);
                    }, 2000);
                }  
            } catch (error) {
                console.error(error);
            }
        }
    }


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

