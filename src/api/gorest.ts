import type { User, Post, PostComment, PaginatedResponse } from './../types/api';

const BASE_URL : string = 'https://gorest.co.in/public/v2';

async function request<T> (path: string, token: string, query?: Record<string, string | number>): Promise<T> {
    const url = new URL(`${BASE_URL}${path}`);
    if(query){
        Object.entries(query).forEach(([key, value]) => 
            url.searchParams.append(key, String(value))
    )};

    const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });

    if(!response.ok){
        const error = new Error(`Request failed with status ${response.status}`);
        (error as Error & {status?: number }).status = response.status;
        throw error;
    };

    const data = await response.json();
    return data as T;
}

async function requestPaginated<T> (path: string, token: string, query?: Record<string, string | number>): Promise<PaginatedResponse<T>> {
    const url = new URL(`${BASE_URL}${path}`);
    if(query){
        Object.entries(query).forEach(([key, value]) => 
            url.searchParams.append(key, String(value)
        )
    )};

    const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });

    if(!response.ok){
        const error = new Error(`Request failed with status ${response.status}`);
        (error as Error & {status?: number }).status = response.status;
        throw error;
    };

    const totalPages = Number(response.headers.get('x-pagination-pages')) || 1;
    const totalCount = Number(response.headers.get('x-pagination-total')) || 0;
    const data = await response.json();

    return {data, totalPages, totalCount};
}


export function getUsers (token : string, page : number, perPage : number) : Promise<PaginatedResponse<User>>  {
    return requestPaginated<User>('/users', token, {page, per_page: perPage});
}

export function getUserById (token : string, id : number) : Promise<User>  {
    return request<User>(`/users/${id}`, token);
}

export function getPosts (token : string, page : number, perPage : number) : Promise<PaginatedResponse<Post>>  {
    return requestPaginated<Post>('/posts', token, {page, per_page: perPage});
}

export function getPostById (token : string, id : number) : Promise<Post>  {
    return request<Post>(`/posts/${id}`, token);
}

export function getCommentsByPostId (token: string, postId : number, page : number, perPage : number) : Promise<PaginatedResponse<PostComment>> {
    return requestPaginated<PostComment>(`/posts/${postId}/comments`, token, {page, per_page: perPage});
}