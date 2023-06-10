import { useState, useEffect } from 'react';
import isUserPremium from './isUserPremium';

function usePremiumStatus(user) {
    const [isPremium, setIsPremium] = useState(false);
    useEffect(() => {
        if (user) {
            const checkPremiumStatus = async () => {
                const premiumStatus = await isUserPremium();
                setIsPremium(premiumStatus);
            }
            checkPremiumStatus();
        }
    }, [user]);
    return isPremium;
}

export { usePremiumStatus };