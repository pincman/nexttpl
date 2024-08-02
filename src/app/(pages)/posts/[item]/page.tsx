import { FC } from 'react';

import { Tools } from '@/app/_components/home/tools';

import $styles from './page.module.css';

const PostItemPage: FC<{ params: { item: string } }> = ({ params }) => (
    <div className={$styles.container}>
        <Tools back />
        <div className={$styles.item}>id: {params.item}</div>
    </div>
);
export default PostItemPage;
