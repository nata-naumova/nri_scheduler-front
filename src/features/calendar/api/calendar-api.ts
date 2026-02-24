import { IApiEvent } from '@/entities/event/api/types';
import { Temporal } from '@js-temporal/polyfill';
import { useEffect, useState } from 'react';

const API_URL = 'http://localhost:3000';

export const useEvents = () => {
  const [events, setEvents] = useState<IApiEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${API_URL}/events`);
        if (!response.ok) {
          throw new Error(`Ошибка ${response.status}`);
        }
        const data = await response.json();
        setEvents(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return { events, loading, error };
};
export const useCompanies = () => {
  const [companies, setCompanies] = useState<{ id: number; name: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch(`${API_URL}/companies`);
        if (!response.ok) {
          throw new Error(`Ошибка ${response.status}`);
        }
        const data = await response.json();
        setCompanies(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  return { companies, loading, error };
};

export const useMasters = () => {
  const [masters, setMasters] = useState<{ id: number; name: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchMasters = async () => {
      try {
        const response = await fetch(`${API_URL}/masters`);
        if (!response.ok) {
          throw new Error(`Ошибка ${response.status}`);
        }
        const data = await response.json();
        setMasters(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchMasters();
  }, []);

  return { masters, loading, error };
};
