import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@consta/uikit/Button';
import { Loader } from '@consta/uikit/Loader';
import { Informer } from '@consta/uikit/Informer';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchPostWithComments, clearCurrentPost } from '../store/postsSlice';
import PostCard from '../components/PostCard';
import styles from './PostCardPage.module.css';

const PostCardPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const { currentPost, comments, loading, error } = useAppSelector((state) => state.posts);
  
  useEffect(() => {
    if (id) {
      dispatch(fetchPostWithComments(Number(id)));
    }
  }, [dispatch, id]);
  
  useEffect(() => {
    return () => {
      dispatch(clearCurrentPost());
    };
  }, [dispatch]);
  
  return (
    <div className={styles.container}>
      <Button
        label="Назад к списку"
        view="ghost"
        onClick={() => navigate('/posts')}
        className={styles.backButton}
      />
      
      {loading && <Loader />}
      
      {error && (
        <Informer status="alert" view="filled" title="Ошибка">
          {error}
        </Informer>
      )}
      
      {!loading && !error && currentPost && (
        <PostCard post={currentPost} comments={comments} />
      )}
    </div>
  );
};

export default PostCardPage;