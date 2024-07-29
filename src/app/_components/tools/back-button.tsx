'use client';

import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { FC, MouseEventHandler, useCallback } from 'react';

import { TiArrowBack } from 'react-icons/ti';

import { Button } from '../shadcn/button';

export const BackButton: FC = () => {
    const router = useRouter();
    const goBack: MouseEventHandler<HTMLButtonElement> = useCallback(
        (e) => {
            e.preventDefault();
            if (window.history.length > 2) router.back();
        },
        [router],
    );
    return (
        <Button
            variant="outline"
            className={clsx('tw-rounded-sm', {
                'tw-pointer-events-none tw-opacity-50': window.history.length <= 1,
            })}
            disabled={window.history.length <= 2}
            aria-disabled={window.history.length <= 2}
            onClick={goBack}
        >
            <TiArrowBack className="tw-mr-2" />
            返回
        </Button>
    );
};
