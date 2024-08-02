'use client';

import { trim } from 'lodash';
import glob from 'micromatch';
import { usePathname, useRouter } from 'next/navigation';
import { FC, PropsWithChildren, useCallback, useEffect, useState } from 'react';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '../shadcn/dialog';

import $styles from './page-modal.module.css';

export const PageModal: FC<PropsWithChildren<{ title: string; match: string[] }>> = ({
    title,
    match,
    children,
}) => {
    const pathname = usePathname();
    const router = useRouter();
    const [show, setShow] = useState(false);
    useEffect(() => {
        setShow(
            glob.isMatch(
                trim(pathname, '/'),
                match.map((m) => trim(m, '/')),
            ),
        );
    }, [pathname, ...match]);
    const close = useCallback(() => router.back(), []);
    return show ? (
        <Dialog open defaultOpen onOpenChange={close}>
            <DialogContent className="sm:tw-max-w-[80%]">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription />
                </DialogHeader>
                <div className={$styles.modalContent}>{children}</div>
            </DialogContent>
        </Dialog>
    ) : null;
};
