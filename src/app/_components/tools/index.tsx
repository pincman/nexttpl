import Link from 'next/link';
import { FC } from 'react';
import { IoMdAdd } from 'react-icons/io';

import { Button } from '../shadcn/button';

import { BackButton } from './back-button';
import $styles from './styles.module.css';

export const Tools: FC<{ back?: boolean }> = ({ back }) => (
    <div className={$styles.tools}>
        {back && <BackButton />}
        <Button asChild className="tw-justify-end tw-rounded-sm tw-ml-auto" variant="outline">
            <Link href="#">
                <IoMdAdd className="tw-mr-2 " />
                创建
            </Link>
        </Button>
    </div>
);
