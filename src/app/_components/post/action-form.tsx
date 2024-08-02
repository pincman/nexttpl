'use client';

import { isNil, omit, trim } from 'lodash';
import { useRouter } from 'next/navigation';
import { FC, useCallback } from 'react';

import { useForm } from 'react-hook-form';

import { createPostItem, updatePostItem } from '@/app/actions/post';
import { IPost } from '@/database/types';
import { faker } from '@/database/utils';

import { getRandomInt } from '@/libs/random';

import { Button } from '../shadcn/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../shadcn/form';
import { Input } from '../shadcn/input';
import { Textarea } from '../shadcn/textarea';

import { PostCreateData, PostCreateFormProps, PostUpdateData, PostUpdateFormProps } from './types';

export const PostActionForm: FC<PostCreateFormProps | PostUpdateFormProps> = (props) => {
    const router = useRouter();
    const submitHandle = useCallback(
        async (data: PostCreateData | PostUpdateData) => {
            let post: IPost;
            try {
                const keywords: string[] | undefined =
                    !isNil(data.keywords) && data.keywords.length
                        ? data.keywords.split(',').map((word) => trim(word, ' '))
                        : undefined;
                post =
                    props.type === 'update'
                        ? await updatePostItem(
                              (data as PostUpdateData).id,
                              omit({ ...data, keywords }, ['id']),
                          )
                        : await createPostItem(omit({ ...(data as PostCreateData), keywords }));
            } catch (error) {
                throw new Error(error as string);
            }
            router.replace(`/posts/${post.id}`);
        },
        [props.type],
    );

    const form = useForm<PostCreateData | PostUpdateData>({
        defaultValues: {
            id: props.type === 'create' ? undefined : props.item.id,
            thumb:
                props.type === 'create'
                    ? `/uploads/thumb/post-${getRandomInt(1, 8)}.png`
                    : props.item.thumb,
            title:
                props.type === 'create'
                    ? faker.lorem.paragraph({ min: 1, max: 3 })
                    : props.item.title,
            body:
                props.type === 'create'
                    ? faker.lorem.paragraphs(getRandomInt(3, 6), '\n')
                    : props.item.body,
            summary: props.type === 'create' ? undefined : props.item.summary,
            keywords:
                props.type === 'create' || isNil(props.item.keywords)
                    ? undefined
                    : props.item.keywords.join(','),
        },
    });
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(submitHandle)} className="tw-space-y-8">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>文章标题</FormLabel>
                            <FormControl>
                                <Input placeholder="请输入标题" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="keywords"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>SEO关键字</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="请输入关键字,用逗号分割(关键字是可选的)"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>关键字之间请用英文逗号(,)分割</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="summary"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>摘要简述</FormLabel>
                            <FormControl>
                                <Textarea placeholder="摘要是可选的" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="body"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>文章内容</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="请输入内容"
                                    {...field}
                                    className="tw-min-h-80"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">{props.submitText}</Button>
            </form>
        </Form>
    );
};
