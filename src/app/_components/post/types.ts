import { IPost } from '@/database/types';

/**
 * 文章创建表单组件参数
 */
export interface PostCreateFormProps {
    type: 'create';
    submitText: string;
}

/**
 * 文章更新表组件单惨
 */
export interface PostUpdateFormProps {
    type: 'update';
    submitText: string;
    item: IPost;
}

/**
 * 文章创建表单处理函数的参数类型
 */
export type PostCreateData = Omit<IPost, 'id' | 'keywords'> & { keywords?: string };

/**
 * 文章创建表单更新函数的参数类型
 */
export type PostUpdateData = Partial<PostCreateData> & { id: string };
