import { Table } from '@consta/uikit/Table';
import { Pagination } from '@consta/uikit/Pagination';
import { Select } from '@consta/uikit/Select';
import { Loader } from '@consta/uikit/Loader';
import { Informer } from '@consta/uikit/Informer';
import type { User } from '../types/api';
import styles from './UserTable.module.css';

type PerPage = 10 | 25 | 50;

interface UserTableProps {
  users: User[];
  loading: boolean;
  error: string | null;
  onRowClick: (userId: number) => void;
  currentPage: number;
  perPage: PerPage;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: PerPage) => void;
}

const splitName = (fullName: string) => {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 0) return { firstName: '', lastName: '' };
  if (parts.length === 1) return { firstName: parts[0], lastName: '' };
  return { firstName: parts[0], lastName: parts.slice(1).join(' ') };
};

const perPageOptions: PerPage[] = [10, 25, 50];

const UserTable = ({
  users,
  loading,
  error,
  onRowClick,
  currentPage,
  perPage,
  totalPages,
  onPageChange,
  onPerPageChange,
}: UserTableProps) => {
  
  if (error) {
    return (
      <Informer status="alert" view="filled" title="Ошибка">
        {error}
      </Informer>
    );
  }
  
  const columns = [
    { title: 'Имя',     accessor: 'firstName' as const, width: 200 },
    { title: 'Фамилия', accessor: 'lastName'  as const, width: 200 },
    { title: 'Email',   accessor: 'email'     as const },
  ];
  
  const rows = users.map((user) => {
    const { firstName, lastName } = splitName(user.name);
    return {
      id: String(user.id),
      _rawId: user.id,
      firstName,
      lastName,
      email: user.email,
    };
  });

  console.log('UsersPage render:', { currentPage, perPage, totalPages});
  
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
          const user = rows.find((r) => r.id === id);
          if (user) onRowClick(user._rawId);
        }}
        zebraStriped="odd"
        isResizable
        minColumnWidth={120}
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
          label="Пользователей на странице:"
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

export default UserTable;