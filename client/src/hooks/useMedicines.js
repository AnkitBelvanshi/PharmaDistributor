import { useCallback, useEffect, useState } from 'react';
import { getMedicinesApi, searchMedicinesApi } from '../api/medicineApi';

const useMedicines = (initialPage = 1) => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });

  const fetchMedicines = useCallback(async (page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getMedicinesApi({ page });
      setMedicines(data.medicines);
      setPagination({ page: data.page, totalPages: data.totalPages, total: data.total });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load medicines');
    } finally {
      setLoading(false);
    }
  }, []);

  const searchMedicines = useCallback(async (q, page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const data = await searchMedicinesApi({ q, page });
      setMedicines(data.medicines);
      setPagination({ page: data.page, totalPages: data.totalPages, total: data.total });
    } catch (err) {
      setError(err.response?.data?.message || 'Search failed');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchMedicines(initialPage); }, [fetchMedicines, initialPage]);

  return { medicines, loading, error, pagination, fetchMedicines, searchMedicines };
};

export default useMedicines;
