import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@consta/uikit/Button';
import { Loader } from '@consta/uikit/Loader';
import { Informer } from '@consta/uikit/Informer';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchUserById, clearCurrentUser } from '../store/usersSlice';
import UserCard from '../components/UserCard';
import styles from './UserCardPage.module.css';

const UserCardPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const { currentUser, loading, error } = useAppSelector((state) => state.users);
  
  useEffect(() => {
    if (id) {
      dispatch(fetchUserById(Number(id)));
    }
  }, [dispatch, id]);
  
  useEffect(() => {
    return () => {
      dispatch(clearCurrentUser());
    };
  }, [dispatch]);
  
  return (
    <div className={styles.container}>
      <Button
        label="Назад к списку"
        view="ghost"
        onClick={() => navigate('/users')}
        className={styles.backButton}
      />
      
      {loading && <Loader />}
      
      {error && (
        <Informer status="alert" view="filled" title="Ошибка">
          {error}
        </Informer>
      )}
      
      {!loading && !error && currentUser && <UserCard user={currentUser} />}
    </div>
  );
};

export default UserCardPage;