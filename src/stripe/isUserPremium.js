import { auth } from '../config/firebase';

export default async function isUserPremium() {
    async function getCustomClaimRole() {
        await auth?.currentUser?.getIdToken(true);
        const decodedToken = await auth?.currentUser?.getIdTokenResult();
        return decodedToken?.claims?.stripeRole;
      }
    
    const fireRoleIsPremium = await getCustomClaimRole().then((role) => {
    if (role === 'premium') {
        console.log('User is premium');
        return true;
    } else {
        console.log('User is not premium');
        return false;
    }
    });
    return fireRoleIsPremium;
}