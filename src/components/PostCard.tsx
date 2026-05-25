import { Card } from '@consta/uikit/Card';
import type { Post, PostComment } from '../types/api';
import styles from './PostCard.module.css';

interface PostCardProps {
  post: Post;
  comments: PostComment[];
}

const PostCard = ({ post, comments }: PostCardProps) => {
  return (
    <div>
      <Card verticalSpace="xl" horizontalSpace="xl" shadow={false} border>
        <h2 className={styles.title}>{post.title}</h2>
        <div className={styles.meta}>
          ID: {post.id} · Автор: {post.user_id}
        </div>
        <p className={styles.body}>{post.body}</p>
      </Card>
      
      <h3 className={styles.commentsHeader}>
        Комментарии ({comments.length})
      </h3>
      
      {comments.length === 0 ? (
        <p className={styles.empty}>Комментариев пока нет</p>
      ) : (
        <div className={styles.commentsList}>
          {comments.map((comment) => (
            <Card
              key={comment.id}
              verticalSpace="m"
              horizontalSpace="m"
              shadow={false}
              border
            >
              <div className={styles.commentHeader}>
                <strong>{comment.name}</strong>
                <a href={`mailto:${comment.email}`} className={styles.commentEmail}>
                  {comment.email}
                </a>
              </div>
              <p className={styles.commentBody}>{comment.body}</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostCard;