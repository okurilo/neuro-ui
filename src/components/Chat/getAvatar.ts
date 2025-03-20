import { UserBasicPhoto } from '@sber-hrp-core/api-user/types';

export const getAvatar = (
    photo?: Pick<UserBasicPhoto, "url">,
    personId?: string
) => {
    if (photo?.url) {
        return `/api-web/cs/api/1/${photo?.url}`;
    }

    if (personId) {
        return `/api-web/cs/api/1/pics/${personId}/userphoto.jpeg`;
    }

    return undefined;
};