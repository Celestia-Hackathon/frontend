import { Copy, CopyCheck } from "lucide-react";
import { useState } from "react";

export default function CopyAddress({address, background} : {address: string; background: "dark" | "light";}) {
    const [copyColor, setCopyColor] = useState(background == 'dark' ? 'hsl(var(--foreground))' : 'hsl(var(--secondary))');
    const [check, setCheck] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(address);

        setCheck(true);
        setCopyColor('hsl(var(--accent))');
        

        const timer = setInterval(() => {
            setCheck(false);
            setCopyColor(background == 'dark' ? 'hsl(var(--foreground))' : 'hsl(var(--secondary))');
        }, 1000)

        return () => clearInterval(timer);
    }

    return (
        <div className="flex items-center gap-1">
            <p className={`text-base text-${background == 'dark' ? 'muted' : 'secondary'}/50`}>{address.substring(0, 7) + '...' + address.substring(35, 42)}</p>
            <button onClick={handleCopy} className="flex items-center">
                <Copy size={16} color={copyColor} className={`transition-all ${check && 'hidden'}`}/>
                <CopyCheck size={16} color={copyColor} className={`transition-all ${!check && 'hidden'}`}/>
            </button>
        </div>
    )
}