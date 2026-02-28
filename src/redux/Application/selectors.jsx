export const selectVotes = state => state.app.polls.items;

export const selectIsLoading = state => state.app.polls.ifLoading;

export const selectPopularVideos = state => state.app.popularVideos;

export const selectPopularImages = state => state.app.popularImages;

export const selectSearchedVideos = state => state.app.searchedVideos;

export const selectSearchedVideosNum = state => state.app.searchVidNmu;

export const selectSearchedImages = state => state.app.searchedImages;

export const selectSavedVideos = state => state.app.savedVideos;

export const selectSavedImages = state => state.app.savedImages;

export const selectSearchedVidWord = state => state.app.searchVidWord;

export const selectSearchedImgWord = state => state.app.searchImgWord;

export const selectMyKey = state => state.app.myKey;

export const selectMyKeyName = state => state.app.keyName;

export const selectMyKeyId = state => state.app.keyId;

export const selectMyKeyMeta = state => state.app.keyMeta;

export const selectLoading = state => state.app.ifLoading;

export const selectFullLoading = state => state.app.ifFullLoading;

export const selectOpenModal = state => state.app.openMyModal;

export const selectOpenKeyModal = state => state.app.openMyKeyModal;

