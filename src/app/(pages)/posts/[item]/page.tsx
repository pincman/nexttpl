import Image from 'next/image';
import { FC } from 'react';

import { Tools } from '@/app/_components/home/tools';

import { queryPostItem } from '@/app/actions/post';

import $styles from './page.module.css';

const PostItemPage: FC<{ params: { item: string } }> = async ({ params }) => {
    const post = await queryPostItem(params.item);
    return (
        <div className={$styles.container}>
            <Tools back />
            <div className={$styles.item}>
                <div className={$styles.thumb}>
                    <Image src={post.thumb} alt={post.title} fill priority sizes="100%" />
                </div>

                <div className={$styles.content}>
                    <header className={$styles.title}>
                        <h1>{post.title}</h1>
                    </header>
                    <div className={$styles.body}>{post.body}</div>
                </div>
            </div>
        </div>
    );
};
export default PostItemPage;
