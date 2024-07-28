import { FC, PropsWithChildren } from 'react';

import { Header } from '../_components/header';

import $styles from './layout.module.css';

const AppLayout: FC<PropsWithChildren> = ({ children }) => (
    <div className={$styles.app}>
        <Header />
        {children}
    </div>
);
export default AppLayout;
