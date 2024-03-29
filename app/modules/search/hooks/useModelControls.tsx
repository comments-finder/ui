import { Box, TextField } from '@mui/material';
import { DateRangePicker } from '@mui/x-date-pickers-pro';
import type { ChangeEventHandler, ComponentProps } from 'react';
import { useRef} from 'react';
import { useCallback} from 'react';

import { SOURCES } from '../constants';
import Select, { Option } from '../components/select';
import Switch from '../components/switch';
import styles from '../styles.module.css';
import { SORT_SWITCH_VALUE } from '../constants';
import Pagination from '../components/pagination';
import type { SourceType } from '../types';

import type { ReturnType } from './useModel';

export default ({
  model,
  setSort,
  setDateRange,
  setSource,
  setQ,
  setPage,
}: ReturnType) => {
  const { q, source, sort, dateRange, page } = model;

  const changeSort = useCallback(() => setSort(!sort), [sort, setSort]); 
  const changeSource = useCallback<Required<ComponentProps<typeof Select>>['onChange']>((e) => {
    setSource(e.target.value as SourceType)
  }, [setSource]);

  const changeQ = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
    setQ(e.target.value)
  }, [setQ]); 

  const changePage = useCallback((pageVal: typeof page) => {
    setPage(pageVal);
  }, [setPage]);

  const renderSortSwitch = useCallback(() => <Switch
    name="sort"
    value={SORT_SWITCH_VALUE}
    checked={sort}
    onChange={changeSort}
  />, [changeSort, sort]);

  const renderDataRangeInput = useRef<ComponentProps<typeof DateRangePicker>['renderInput']>
  ((startProps, endProps) =>  <>
    <TextField {...startProps} size='small' label='From' name='publicationDateFrom' />
    <Box sx={{ mx: 2 }}> to </Box>
    <TextField {...endProps} size='small' label='To' name='publicationDateTo' />
  </>).current

  const renderDateRange = useCallback(() => <DateRangePicker
    value={dateRange}
    onChange={setDateRange}
    renderInput={renderDataRangeInput}
  />, [dateRange, setDateRange]);

  const renderSourceSelect = useCallback(() => <Select
    name="source"
    btnClassName={`${styles.formItem} ${styles.sourceControl}`}
    value={source}
    onChange={changeSource}
  >
    {SOURCES.map(({ id, text }) => (
      <Option value={id} key={id}>
        {text}
      </Option>
    ))}
  </Select>, [source, changeSource]);

  const renderQueryInput = useCallback(() => <input
    className={`${styles.formItem} ${styles.searchControl}`}
    type="text"
    name="q"
    placeholder="Search phrase"
    value={q}
    onChange={changeQ}
  />, [q, changeQ]);

  const renderPagination = useCallback((loadMoreActive: boolean) => (
    <Pagination
      page={page}
      loadMoreActive={loadMoreActive}
      onChange={changePage}
    />
  ), [page, changePage]);

  return {
    renderSortSwitch,
    renderDateRange,
    renderSourceSelect,
    renderQueryInput,
    renderPagination,
  }
}