import { Card } from '@consta/uikit/Card';
import { Badge } from '@consta/uikit/Badge';
import type { User } from '../types/api';
import styles from './UserCard.module.css';

interface UserCardProps {
  user: User;
}

const UserCard = ({ user }: UserCardProps) => {
  return (
    <Card verticalSpace="xl" horizontalSpace="xl" shadow={false} border>
      <h2 className={styles.name}>{user.name}</h2>
      
      <div className={styles.field}>
        <span className={styles.label}>Email:</span>
        <a href={`mailto:${user.email}`}>{user.email}</a>
      </div>
      
      <div className={styles.field}>
        <span className={styles.label}>Пол:</span>
        <span>{user.gender === 'male' ? 'Мужской' : 'Женский'}</span>
      </div>
      
      <div className={styles.field}>
        <span className={styles.label}>Статус:</span>
        <Badge
          status={user.status === 'active' ? 'success' : 'system'}
          label={user.status === 'active' ? 'Активный' : 'Неактивный'}
        />
      </div>
      
      <div className={styles.field}>
        <span className={styles.label}>ID:</span>
        <span>{user.id}</span>
      </div>
    </Card>
  );
};

export default UserCard;