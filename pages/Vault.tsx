
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Deprecated: Vault logic has been moved to Circles.tsx under 'vault' ID to unify UI
export const Vault: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/circles/vault', { replace: true });
  }, []);
  return null;
};
