import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Navigate() {
    const navigator = useNavigate();
    
    useEffect(() => {
        navigator('/feed');
    }, [])

    return (
        <div>
            <h1>Redirecting...</h1>
        </div>
    )
}