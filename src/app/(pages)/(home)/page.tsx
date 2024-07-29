import { isNil } from 'lodash';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { AiOutlineCalendar, AiOutlineDelete } from 'react-icons/ai';

import { Button } from '@/app/_components/shadcn/button';
import { Tools } from '@/app/_components/tools';
import { queryPostPaginate } from '@/app/actions/post';

import $styles from './page.module.css';

const HomePage: FC<{ searchParams: Record<string, any> }> = async ({ searchParams }) => {
    const { page = 1, limit = 8 } = searchParams;
    const { items } = await queryPostPaginate({ page: Number(page), limit });
    return (
        <div className={$styles.container}>
            <Tools />
            {items.length > 0 ? (
                <div className={$styles.list}>
                    {items.map((item) => (
                        <div
                            className={$styles.item}
                            // 传入css变量的封面图用于鼠标移动到此处后会出现不同颜色的光晕效果
                            style={{ '--bg-img': `url(${item.thumb})` } as any}
                            key={item.id}
                        >
                            <Link className={$styles.thumb} href="#">
                                <Image
                                    src={item.thumb}
                                    alt={item.title}
                                    fill
                                    priority
                                    sizes="100%"
                                />
                            </Link>
                            <div className={$styles.content}>
                                <div className={$styles.title}>
                                    <Link href="#">
                                        <h2 className="tw-ellips tw-animate-decoration tw-animate-decoration-lg">
                                            {item.title}
                                        </h2>
                                    </Link>
                                </div>
                                <div className={$styles.summary}>
                                    {isNil(item.summary)
                                        ? item.body.substring(0, 99)
                                        : item.summary}
                                </div>
                                <div className={$styles.footer}>
                                    <div className={$styles.meta}>
                                        <span>
                                            <AiOutlineCalendar />
                                        </span>
                                        <time className="tw-ellips">2022年6月22日</time>
                                    </div>
                                    <div className={$styles.meta}>
                                        <Button className="tw-mr-3">
                                            <AiOutlineDelete className="tw-mr-2" />
                                            编辑
                                        </Button>
                                        <Button variant="outline">
                                            <AiOutlineDelete className="tw-mr-2" />
                                            删除
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className={$styles.noData}>你已经超过最底页了，都是404了，请回首页吧</div>
            )}
            {/* {items.length > 0 && <PostListPaginate limit={8} />} */}
        </div>
    );
};
export default HomePage;
