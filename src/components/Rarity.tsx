
export default function Rarity({rarity}: {rarity: "Common" | "Uncommon" | "Rare" | "Epic" | "Legendary" | "Special" }) {
    switch (rarity) {
        case "Common":
            return (
                <div className={`absolute top-1 left-1 px-1 rounded-lg border-2 border-common bg-common/[.35]`}>   
                    <p className={`text-[0.6rem] lg:text-[0.7rem] text-common font-bold`}>{rarity}</p>
                </div>
            )
        case "Uncommon":
            return (
                <div className={`absolute top-1 left-1 px-1 rounded-lg border-2 border-uncommon bg-uncommon/[.35]`}>   
                    <p className={`text-[0.6rem] lg:text-[0.7rem] text-uncommon font-bold`}>{rarity}</p>
                </div>
            )
        case "Rare":
            return (
                <div className={`absolute top-1 left-1 px-1 rounded-lg border-2 border-rare bg-rare/[.35]`}>   
                    <p className={`text-[0.6rem] lg:text-[0.7rem] text-rare font-bold`}>{rarity}</p>
                </div>
            )
        case "Epic":
            return (
                <div className={`absolute top-1 left-1 px-1 rounded-lg border-2 border-epic bg-epic/[.35]`}>   
                    <p className={`text-[0.6rem] lg:text-[0.7rem] text-epic font-bold`}>{rarity}</p>
                </div>
            )
        case "Legendary":
            return (
                <div className={`absolute top-1 left-1 px-1 rounded-lg border-2 border-legendary bg-legendary/[.35]`}>   
                    <p className={`text-[0.6rem] lg:text-[0.7rem] text-legendary font-bold`}>{rarity}</p>
                </div>
            )
        case "Special":
            return (
                <div className={`absolute top-1 left-1 px-1 rounded-lg border-2 border-special bg-special/[.35]`}>   
                    <p className={`text-[0.6rem] lg:text-[0.7rem] text-special font-bold`}>{rarity}</p>
                </div>
            )
    }
} 