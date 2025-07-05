import { useState, useEffect } from 'react';
import { getAccountStatusApi } from '../../services/auth/api';

interface AccountStatus {
  isBlocked: boolean;
  failedAttempts: number;
  maxAttempts: number;
  remainingAttempts: number;
}

export const useAccountStatus = (email: string | null) => {
  const [accountStatus, setAccountStatus] = useState<AccountStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAccountStatus = async () => {
    if (!email) return;

    setLoading(true);
    setError(null);

    try {
      const status = await getAccountStatusApi(email);
      setAccountStatus(status);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al obtener el estado de la cuenta');
      console.error('Error fetching account status:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (email) {
      fetchAccountStatus();
    }
  }, [email]);

  const refreshStatus = () => {
    fetchAccountStatus();
  };

  return {
    accountStatus,
    loading,
    error,
    refreshStatus,
  };
}; 