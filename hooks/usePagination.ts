import { PaginationMeta } from '@/types/globals.types';
import { useCallback, useMemo, useState } from 'react';

type Props = {
  take: number;
};

const usePagination = ({ take }: Props) => {
  const [currentPage, setCurrentPage] = useState();
  const [paginationMeta, setPaginationMeta] = useState<PaginationMeta>();
  const updatePaginationMeta = useCallback((meta: PaginationMeta) => {
    setPaginationMeta(meta);
  }, []);
  const currentPages = useMemo(() => {
    if (!paginationMeta) return [];
    const startPage = Math.max(
      1,
      paginationMeta.currentPage - Math.floor(take / 2),
    );
    const endPage = Math.min(paginationMeta.totalPages, startPage + take - 1);
    const currentPages = Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i,
    );
    return currentPages;
  }, [paginationMeta, take]);

  const disableNext = useMemo(() => {
    if (!paginationMeta) return true;
    return paginationMeta.currentPage === paginationMeta.totalPages;
  }, [paginationMeta]);
  const disablePrev = useMemo(() => {
    if (!paginationMeta) return true;
    return paginationMeta.currentPage === 1;
  }, [paginationMeta]);

  return {
    disableNext,
    disablePrev,
    paginationMeta,
    updatePaginationMeta,
    currentPages,
  };
};

export default usePagination;
