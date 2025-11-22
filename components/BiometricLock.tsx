import React, { useState, useEffect } from 'react';
import { Fingerprint, Lock, AlertCircle } from 'lucide-react';
import { Button } from './Button';

interface BiometricLockProps {
  onUnlock: () => void;
}

export const BiometricLock: React.FC<BiometricLockProps> = ({ onUnlock }) => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    // Check if WebAuthn is supported
    const checkSupport = async () => {
      if (navigator.credentials && navigator.credentials.create) {
        try {
          // Check if platform authenticator (biometrics) is available
          const available = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
          setIsSupported(available);
          
          // If supported, try to authenticate immediately
          if (available) {
            setTimeout(() => {
              handleBiometricAuth();
            }, 500);
          }
        } catch (err) {
          console.log('Biometric check failed:', err);
          setIsSupported(false);
        }
      } else {
        setIsSupported(false);
      }
    };

    checkSupport();
  }, []);

  const handleBiometricAuth = async () => {
    setIsAuthenticating(true);
    setError(null);

    try {
      // Check if we have a stored credential ID
      const storedCredentialId = localStorage.getItem('biometric_credential_id');
      
      if (!storedCredentialId) {
        // First time setup - create credential
        await createBiometricCredential();
      } else {
        // Authenticate with existing credential
        await authenticateWithBiometric(storedCredentialId);
      }
    } catch (err: any) {
      console.error('Biometric authentication error:', err);
      setError(err.message || 'Authentication failed. Please try again.');
      setIsAuthenticating(false);
    }
  };

  const createBiometricCredential = async () => {
    try {
      // Generate a random user ID
      const userId = new Uint8Array(16);
      crypto.getRandomValues(userId);

      // Create credential
      const publicKeyCredentialCreationOptions: PublicKeyCredentialCreationOptions = {
        challenge: crypto.getRandomValues(new Uint8Array(32)),
        rp: {
          name: 'SaveCircle',
          id: window.location.hostname,
        },
        user: {
          id: userId,
          name: 'savecircle_user',
          displayName: 'SaveCircle User',
        },
        pubKeyCredParams: [{ alg: -7, type: 'public-key' }],
        authenticatorSelection: {
          authenticatorAttachment: 'platform',
          userVerification: 'required',
        },
        timeout: 60000,
        attestation: 'direct',
      };

      const credential = await navigator.credentials.create({
        publicKey: publicKeyCredentialCreationOptions,
      }) as PublicKeyCredential;

      if (credential) {
        // Store credential ID for future use
        const credentialId = Array.from(new Uint8Array(credential.rawId))
          .map(b => b.toString(16).padStart(2, '0'))
          .join('');
        localStorage.setItem('biometric_credential_id', credentialId);
        
        // Successfully created, now unlock
        onUnlock();
      }
    } catch (err: any) {
      if (err.name === 'NotAllowedError') {
        throw new Error('Biometric setup was cancelled');
      } else if (err.name === 'NotSupportedError') {
        throw new Error('Biometric authentication is not supported on this device');
      } else {
        throw new Error('Failed to set up biometric authentication');
      }
    }
  };

  const authenticateWithBiometric = async (credentialId: string) => {
    try {
      // Convert stored credential ID back to ArrayBuffer
      const credentialIdBuffer = new Uint8Array(
        credentialId.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16))
      ).buffer;

      const publicKeyCredentialRequestOptions: PublicKeyCredentialRequestOptions = {
        challenge: crypto.getRandomValues(new Uint8Array(32)),
        allowCredentials: [{
          id: credentialIdBuffer,
          type: 'public-key',
          transports: ['internal'],
        }],
        timeout: 60000,
        userVerification: 'required',
      };

      const assertion = await navigator.credentials.get({
        publicKey: publicKeyCredentialRequestOptions,
      });

      if (assertion) {
        // Authentication successful
        onUnlock();
      }
    } catch (err: any) {
      if (err.name === 'NotAllowedError') {
        throw new Error('Authentication was cancelled');
      } else if (err.name === 'InvalidStateError') {
        // Credential might be invalid, try to recreate
        localStorage.removeItem('biometric_credential_id');
        throw new Error('Please set up biometric authentication again');
      } else {
        throw new Error('Authentication failed. Please try again.');
      }
    }
  };

  const handleSkip = () => {
    // Allow user to skip (for testing or if biometrics fail)
    // In production, you might want to require biometrics
    onUnlock();
  };

  if (!isSupported) {
    return (
      <div className="fixed inset-0 z-[200] flex items-center justify-center bg-background-light dark:bg-background-dark p-4">
        <div className="bg-card-light dark:bg-card-dark rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl border border-border-light dark:border-white/10">
          <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="text-red-500" size={40} />
          </div>
          <h2 className="text-2xl font-bold text-text-primary-light dark:text-white mb-2">
            Biometrics Not Available
          </h2>
          <p className="text-text-secondary-light dark:text-text-secondary-dark mb-6">
            Your device doesn't support biometric authentication. Please disable this feature in Settings.
          </p>
          <Button fullWidth onClick={handleSkip}>
            Continue Anyway
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-background-light dark:bg-background-dark p-4">
      <div className="bg-card-light dark:bg-card-dark rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl border border-border-light dark:border-white/10">
        <div className="w-24 h-24 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center mx-auto mb-6 animate-pulse">
          {isAuthenticating ? (
            <div className="w-16 h-16 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
          ) : (
            <Fingerprint className="text-primary" size={48} />
          )}
        </div>
        
        <h2 className="text-2xl font-bold text-text-primary-light dark:text-white mb-2">
          {isAuthenticating ? 'Authenticating...' : 'Unlock SaveCircle'}
        </h2>
        
        <p className="text-text-secondary-light dark:text-text-secondary-dark mb-6">
          {isAuthenticating 
            ? 'Please use your fingerprint or face ID'
            : 'Use your biometric to unlock the app'
          }
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
            <p className="text-red-500 text-sm font-medium">{error}</p>
          </div>
        )}

        <div className="space-y-3">
          <Button 
            fullWidth 
            size="lg" 
            onClick={handleBiometricAuth}
            disabled={isAuthenticating}
            className={isAuthenticating ? 'opacity-50' : ''}
          >
            {isAuthenticating ? 'Authenticating...' : 'Unlock with Biometric'}
          </Button>
          
          {error && (
            <button
              onClick={handleSkip}
              className="text-sm text-text-secondary-light dark:text-text-secondary-dark hover:text-primary transition-colors"
            >
              Skip for now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

