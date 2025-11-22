

import { INITIAL_USER, MOCK_CIRCLES } from '../constants';
import { User, Circle, ChatMessage } from '../types';

// --- User State ---
export const getUser = (): User => {
  const stored = localStorage.getItem('savecircle_user');
  if (stored) return JSON.parse(stored);
  
  // Legacy fallback check (migration path)
  const storedGems = localStorage.getItem('savecircle_gems');
  const storedXp = localStorage.getItem('savecircle_xp');
  const storedGoal = localStorage.getItem('savecircle_daily_goal');
  
  const user = { ...INITIAL_USER };
  if (storedGems) user.gems = parseInt(storedGems);
  if (storedXp) user.xp = parseInt(storedXp);
  if (storedGoal) user.dailyGoal = parseInt(storedGoal);
  
  return user;
};

export const updateUser = (updates: Partial<User>) => {
  const current = getUser();
  const updated = { ...current, ...updates };
  localStorage.setItem('savecircle_user', JSON.stringify(updated));
  
  // Sync legacy keys for components that might still read them directly (just in case)
  localStorage.setItem('savecircle_gems', updated.gems.toString());
  localStorage.setItem('savecircle_xp', updated.xp.toString());
  localStorage.setItem('savecircle_daily_goal', updated.dailyGoal.toString());
  
  return updated;
};

// --- Circles State ---
export const getCircles = (): Circle[] => {
    const stored = localStorage.getItem('savecircle_circles');
    if (stored) return JSON.parse(stored);
    
    // Initialize with MOCK if empty
    // Check for joined states from legacy
    const initializedCircles = MOCK_CIRCLES.map(c => {
        const hasJoined = localStorage.getItem(`joined_${c.id}`) === 'true';
        if (hasJoined) return { ...c, isUserMember: true };
        return c;
    });
    
    return initializedCircles;
};

export const updateCircle = (circleId: string, updates: Partial<Circle>) => {
    const circles = getCircles();
    const index = circles.findIndex(c => c.id === circleId);
    
    if (index !== -1) {
        circles[index] = { ...circles[index], ...updates };
        localStorage.setItem('savecircle_circles', JSON.stringify(circles));
    } else {
        // Handle specific case for Vault (which mimics user totalSaved)
        if (circleId === 'vault') {
            // Logic handled in components usually, but if we need to store vault as a circle:
             // Vault is special, usually synced with user.totalSaved
        }
    }
    return circles;
};

export const addCircle = (circle: Circle) => {
    const circles = getCircles();
    // Add to beginning of array so it shows up first/prominently
    circles.unshift(circle); 
    localStorage.setItem('savecircle_circles', JSON.stringify(circles));
    return circles;
};

export const deleteCircle = (circleId: string) => {
    const circles = getCircles();
    const index = circles.findIndex(c => c.id === circleId);
    
    if (index !== -1) {
        const circle = circles[index];
        const amount = circle.poolTotal;
        const invested = circle.investedAmount || 0;
        
        // Remove circle
        const newCircles = circles.filter(c => c.id !== circleId);
        localStorage.setItem('savecircle_circles', JSON.stringify(newCircles));
        
        // Transfer funds to Vault (User Total Saved) if any
        if (amount > 0 || invested > 0) {
            const user = getUser();
            const newTotal = user.totalSaved + amount + invested;
            updateUser({ totalSaved: newTotal });
        }
        
        return newCircles;
    }
    return circles;
};

export const withdrawFromCircle = (circleId: string, amount: number) => {
    if (circleId === 'vault') {
        const user = getUser();
        const newTotal = Math.max(0, user.totalSaved - amount);
        updateUser({ totalSaved: newTotal });
        
        // Also update the Vault object in circles list if it exists to keep data consistent
        const circles = getCircles();
        const index = circles.findIndex(c => c.id === 'vault');
        if (index !== -1) {
            circles[index] = { ...circles[index], poolTotal: newTotal };
            localStorage.setItem('savecircle_circles', JSON.stringify(circles));
        }
        
        return getCircle('vault')!;
    } else {
        const circles = getCircles();
        const index = circles.findIndex(c => c.id === circleId);
        if (index !== -1) {
            const currentTotal = circles[index].poolTotal;
            const newTotal = Math.max(0, currentTotal - amount);
            circles[index] = { ...circles[index], poolTotal: newTotal };
            localStorage.setItem('savecircle_circles', JSON.stringify(circles));
            return circles[index];
        }
    }
    return undefined;
};

// Move money from poolTotal (Liquid) to investedAmount
export const investFunds = (circleId: string, amount: number, planId: string) => {
    if (amount <= 0) return undefined;

    if (circleId === 'vault') {
        const user = getUser();
        
        // First ensure vault exists in circles array
        const circles = getCircles();
        let vault = circles.find(c => c.id === 'vault');
        if (!vault) {
            vault = MOCK_CIRCLES.find(c => c.id === 'vault')!;
            vault.poolTotal = user.totalSaved;
            circles.unshift(vault);
            // Save immediately to ensure it exists for updateCircle
            localStorage.setItem('savecircle_circles', JSON.stringify(circles));
        }
        
        // Calculate new balances
        const currentInvested = vault.investedAmount || 0;
        const newLiquid = Math.max(0, user.totalSaved - amount);
        
        // 1. Update User Global Balance (Liquid Cash)
        updateUser({ totalSaved: newLiquid });
        
        // 2. Update Vault Circle (Investment Data)
        updateCircle('vault', {
             poolTotal: newLiquid,
             investedAmount: currentInvested + amount,
             investmentPlanId: planId
        });
        
        return getCircle('vault');
    } else {
        const circle = getCircle(circleId);
        if (circle) {
             const currentInvested = circle.investedAmount || 0;
             updateCircle(circleId, {
                 poolTotal: Math.max(0, circle.poolTotal - amount),
                 investedAmount: currentInvested + amount,
                 investmentPlanId: planId
             });
             return getCircle(circleId);
        }
    }
    return undefined;
};

// Move money from investedAmount back to poolTotal (and User Total for Vault)
export const withdrawInvestment = (circleId: string, amount: number, isFullWithdrawal: boolean = false) => {
    if (amount <= 0 && !isFullWithdrawal) return undefined;

    const circle = getCircle(circleId);
    if (circle) {
         const currentInvested = circle.investedAmount || 0;
         const amountToWithdraw = isFullWithdrawal ? currentInvested : amount;
         
         if (currentInvested < amountToWithdraw) return undefined;

         const newInvested = currentInvested - amountToWithdraw;
         const updates: Partial<Circle> = {
             investedAmount: newInvested
         };

         if (isFullWithdrawal) {
             updates.investmentPlanId = undefined;
         }

         if (circleId === 'vault') {
             // For Vault, moving money out of investment means it goes back to User's "Pocket" (totalSaved)
             const user = getUser();
             const newLiquid = user.totalSaved + amountToWithdraw;
             
             updateUser({ totalSaved: newLiquid });
             updates.poolTotal = newLiquid;
             
             updateCircle('vault', updates);
         } else {
             // For regular circles, money goes back to circle pool
             updates.poolTotal = circle.poolTotal + amountToWithdraw;
             updateCircle(circleId, updates);
         }
         
         return getCircle(circleId);
    }
    return undefined;
};


export const getCircle = (circleId: string): Circle | undefined => {
    if (circleId === 'vault') {
        const user = getUser();
        const storedCircles = getCircles();
        const storedVault = storedCircles.find(c => c.id === 'vault');
        
        if (storedVault) {
             // Always sync poolTotal with user.totalSaved to ensure consistency between "User Wallet" and "Vault Circle"
             return {
                 ...storedVault,
                 poolTotal: user.totalSaved
             };
        } else {
             const baseVault = MOCK_CIRCLES.find(c => c.id === 'vault');
             if (!baseVault) return undefined;
             return {
                ...baseVault,
                poolTotal: user.totalSaved
             };
        }
    }
    return getCircles().find(c => c.id === circleId);
}

export const addMessage = (circleId: string, text: string) => {
    const circles = getCircles();
    let index = circles.findIndex(c => c.id === circleId);
    
    // If vault, and it's not in the stored list yet (because it's MOCK only initially), add it
    if (circleId === 'vault' && index === -1) {
        const mockVault = MOCK_CIRCLES.find(c => c.id === 'vault');
        if (mockVault) {
            circles.unshift(mockVault);
            index = 0;
        }
    }

    if (index !== -1) {
        const newMessage: ChatMessage = {
            id: Date.now().toString(),
            userId: 'u1',
            text,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            type: 'msg'
        };
        
        const circle = circles[index];
        const updatedMessages = [...(circle.messages || []), newMessage];
        circles[index] = { ...circle, messages: updatedMessages };
        localStorage.setItem('savecircle_circles', JSON.stringify(circles));
        return circles[index];
    }
    return undefined;
};
