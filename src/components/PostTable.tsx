import { Table } from '@consta/uikit/Table';
import { Pagination } from '@consta/uikit/Pagination';
import { Select } from '@consta/uikit/Select';
import { Loader } from '@consta/uikit/Loader';
import { Informer } from '@consta/uikit/Informer';
import type { Post } from '../types/api';
import styles from './PostTable.module.css';

type PerPage = 10 | 25 | 50;

interface PostTableProps {
  posts: Post[];
  loading: boolean;
  error: string | null;
  onRowClick: (postId: number) => void;
  currentPage: number;
  perPage: PerPage;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: PerPage) => void;
}

const perPageOptions: PerPage[] = [10, 25, 50];

const PostTable = ({
  posts,
  loading,
  error,
  onRowClick,
  currentPage,
  perPage,
  totalPages,
  onPageChange,
  onPerPageChange,
}: PostTableProps) => {
  
  if (error) {
    return (
      <Informer status="alert" view="filled" title="Ошибка">
        {error}
      </Informer>
    );
  }
  
  const columns = [
    { title: 'ID',         accessor: 'id'    as const, width: 120 },
    { title: 'Заголовок',  accessor: 'title' as const },
  ];
  
  const rows = posts.map((post) => ({
    id: String(post.id),
    _rawId: post.id,
    title: post.title,
  }));
  
  return (
    <div className={styles.tableWrapper}>
      {loading && (
        <div className={styles.loaderOverlay}>
          <Loader />
        </div>
      )}
      
      <Table
        columns={columns}
        rows={rows}
        onRowClick={({ id }) => {
          const row = rows.find((r) => r.id === id);
          if (row) onRowClick(row._rawId);
        }}
        zebraStriped="odd"
        getCellWrap={() => 'truncate'}
      />
      
      <div className={styles.paginationRow}>
      <Pagination
            items={totalPages}
            value={currentPage}
            onChange={(value) => onPageChange(value)}
            showFirstPage
            showLastPage
            visibleCount={6}
            arrows={[true, true]}
            size="l"
        />
        
        <Select
          label="Постов на странице:"
          value={perPage}
          items={perPageOptions}
          onChange={(value) => {
            if (value) onPerPageChange(value);
          }}
          getItemLabel={(item: PerPage) => String(item)}
          getItemKey={(item: PerPage) => String(item)}
          size='l'
        />
      </div>
    </div>
  );
};

export default PostTable;