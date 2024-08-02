import { FC, PropsWithChildren } from 'react';

import { PageModal } from '@/app/_components/modal/page-modal';
import { PostActionForm } from '@/app/_components/post/action-form';

const CreatePostPage: FC<PropsWithChildren> = () => (
    <PageModal title="创建文章" match={['/post-create']}>
        <PostActionForm type="create" submitText="保持" />
    </PageModal>
);

export default CreatePostPage;
