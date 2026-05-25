import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@consta/uikit/Button';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchUsers, setCurrentPage, setPerPage, clearUsers } from '../store/usersSlice';
import UserTable from '../components/UserTable';
import styles from './UsersPage.module.css';

const UsersPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const { list, loading, error, currentPage, perPage, totalPages } = useAppSelector(
    (state) => state.users
  );
  
  useEffect(() => {
    dispatch(fetchUsers({ page: currentPage, perPage }));
  }, [dispatch, currentPage, perPage]);
  
  useEffect(() => {
    return () => {
      dispatch(clearUsers());
    };
  }, [dispatch]);
  
  const handleRowClick = (userId: number) => {
    navigate(`/users/${userId}`);
  };
  
  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };
  
  const handlePerPageChange = (newPerPage: 10 | 25 | 50) => {
    dispatch(setPerPage(newPerPage));
  };
  
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Пользователи</h1>
        <Button label="Посты" view="ghost" onClick={() => navigate('/posts')} />
      </div>

      <UserTable
        users={list}
        loading={loading}
        error={error}
        onRowClick={handleRowClick}
        currentPage={currentPage}
        perPage={perPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        onPerPageChange={handlePerPageChange}
      />
    </div>
  );
};

export default UsersPage;