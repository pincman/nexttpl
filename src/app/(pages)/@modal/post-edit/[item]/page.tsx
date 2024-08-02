import { FC } from 'react';

import { PageModal } from '@/app/_components/modal/page-modal';
import { PostActionForm } from '@/app/_components/post/action-form';
import { queryPostItem } from '@/app/actions/post';

const PostEdit: FC<{ params: { item: string } }> = async ({ params: { item } }) => {
    const post = await queryPostItem(item);
    return (
        <PageModal title="编辑文章" match={['/post-edit/*']}>
            <PostActionForm type="update" submitText="更新" item={post} />
        </PageModal>
    );
};
export default PostEdit;
