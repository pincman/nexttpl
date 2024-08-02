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
    // 数据提交处理函数
    const submitHandle = useCallback(
        async (data: PostCreateData | PostUpdateData) => {
            let post: IPost;
            try {
                // 在表单中关键词是一个使用逗号分割的字符串
                // 在此处需要用逗号切割成数组再提交
                const keywords: string[] | undefined =
                    !isNil(data.keywords) && data.keywords.length
                        ? data.keywords.split(',').map((word) => trim(word, ' '))
                        : undefined;
                post =
                    // 更新文章
                    props.type === 'update'
                        ? await updatePostItem(
                              (data as PostUpdateData).id,
                              omit({ ...data, keywords }, ['id']),
                          )
                        : // 创建文章
                          await createPostItem(omit({ ...(data as PostCreateData), keywords }));
            } catch (error) {
                throw new Error(error as string);
            }
            // 创建或更新文章后跳转到文章详情页
            // 注意,这里不要用push,防止在详情页后退后返回到创建或编辑页面的弹出框
            router.replace(`/posts/${post.id}`);
        },
        [props.type],
    );

    // 表单中的数据值获取
    const form = useForm<PostCreateData | PostUpdateData>({
        // 定义默认数据
        defaultValues: {
            // 创建文章时,没有ID;更新文章时,id为当前文章的id
            id: props.type === 'create' ? undefined : props.item.id,
            // 创建文章时,封面图随机选取;更新文章时,封面图不变
            thumb:
                props.type === 'create'
                    ? `/uploads/thumb/post-${getRandomInt(1, 8)}.png`
                    : props.item.thumb,
            // 创建文章时,默认标题为faker生成的假数据;更新文章时,默认标题为文章原来的标题
            title:
                props.type === 'create'
                    ? faker.lorem.paragraph({ min: 1, max: 3 })
                    : props.item.title,
            // 创建文章时,默认内容为faker生成的假数据;更新文章时,默认内容为文章原来的内容
            body:
                props.type === 'create'
                    ? faker.lorem.paragraphs(getRandomInt(3, 6), '\n')
                    : props.item.body,
            // 创建文章时,默认摘要为空;更新文章时,默认摘要为文章原来的摘要
            summary: props.type === 'create' ? undefined : props.item.summary,
            // 创建文章时,默认关键字为空;更新文章时,如果文章原来存在关键词,则用逗号把关键词数组连接为一个字符串作为默认关键词.如果原来不存在则为空
            keywords:
                // eslint-disable-next-line no-nested-ternary
                props.type === 'create'
                    ? undefined
                    : !isNil(props.item.keywords)
                      ? props.item.keywords.join(',')
                      : undefined,
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
