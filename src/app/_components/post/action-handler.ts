'use server';

import { isNil, omit, trim } from 'lodash';

import { redirect } from 'next/navigation';

import { createPostItem, updatePostItem } from '@/app/actions/post';

import { IPost } from '@/database/types';

import { PostCreateData, PostUpdateData } from './types';

export const handlePostActionForm = async (
    type: 'create' | 'update',
    data: PostCreateData | PostUpdateData,
) => {
    let post: IPost;
    try {
        const keywords: string[] | undefined =
            !isNil(data.keywords) && data.keywords.length
                ? data.keywords.split(',').map((word) => trim(word, ' '))
                : undefined;
        post =
            type === 'update'
                ? await updatePostItem(
                      (data as PostUpdateData).id,
                      omit({ ...data, keywords }, ['id']),
                  )
                : await createPostItem(omit({ ...(data as PostCreateData), keywords }));
    } catch (error) {
        throw new Error(error as string);
    }
    redirect(`/posts/${post.id}`);
};
