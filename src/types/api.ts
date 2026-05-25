export interface User {
    id: number;
    name: string;
    email: string;
    gender: 'male' | 'female';
    status: 'active' | 'inactive';
}

export interface Post {
    id: number;
    user_id: number;
    title: string;
    body: string;
}

export interface PostComment {
    id: number;
    post_id: number;
    name: string;
    email: string;
    body: string;
}

export interface PaginatedResponse<T> {
    data: T[];
    totalPages: number;
    totalCount: number;
}