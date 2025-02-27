import React, { useContext, useMemo } from 'react';

import { Pagination as MPagination } from '@mui/material';
import { IPaginationProps } from './pagiation.types';
import { NewsContext } from '../../contexts/news/news';

export const Pagination = ({ numberOfResults }: IPaginationProps) => {
  const { state, setState } = useContext(NewsContext);
  const count = useMemo(() => {
    return Math.ceil(numberOfResults / 10);
  }, [numberOfResults]);

  return (
    <MPagination
      count={count}
      page={state.page}
      onChange={(e, value) =>
        setState((prevState) => ({ ...prevState, page: value }))
      }
    />
  );
};
