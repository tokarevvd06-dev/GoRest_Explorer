import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@consta/uikit/Button';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchPosts, setCurrentPage, setPerPage, clearPosts } from '../store/postsSlice';
import PostTable from '../components/PostTable';
import styles from './PostsPage.module.css';

const PostsPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const { list, loading, error, currentPage, perPage, totalPages } = useAppSelector(
    (state) => state.posts
  );
  
  useEffect(() => {
    dispatch(fetchPosts({ page: currentPage, perPage }));
  }, [dispatch, currentPage, perPage]);
  
  useEffect(() => {
    return () => {
      dispatch(clearPosts());
    };
  }, [dispatch]);
  
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Посты</h1>
        <Button label="Пользователи" view="ghost" onClick={() => navigate('/users')} />
      </div>

      <PostTable
        posts={list}
        loading={loading}
        error={error}
        onRowClick={(id) => navigate(`/posts/${id}`)}
        currentPage={currentPage}
        perPage={perPage}
        totalPages={totalPages}
        onPageChange={(page) => dispatch(setCurrentPage(page))}
        onPerPageChange={(p) => dispatch(setPerPage(p))}
      />
    </div>
  );
};

export default PostsPage;