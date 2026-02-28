import { createSlice } from '@reduxjs/toolkit';
import {
  fetchPopularVideos,
  fetchMorePopularVideos,
  fetchSavedVideos,
  fetchSavedImages,
  fetchVotes,
  addVote,
  searchVideos,
  fetchVidWord,
  fetchPopularImages,
  //fetchMorePopularImages,
  searchMoreImages,
  searchImages,
  fetchImgWord,
  deleteImages,
  deleteVideos,
  searchMoreVideos,
  createKey,
  retrieveKey,
  updateKey,
  deleteKey,
  openModal,
  closeModal,
  openKeyModal,
  closeKeyModal,
} from './operations';

const handlePending = state => {
  state.polls.ifLoading = true;
};
const handleRejected = (state, action) => {
  state.polls.ifLoading = false;
  state.polls.error = action.payload;
};

const appSlice = createSlice({
  name: 'app',
  initialState: {
    popularVideos: [],
    searchedVideos: [],
    savedVideos: [],
    savedImages: [],
    searchVidWord: null,
    popularImages: [],
    searchedImages: [],
    searchImgWord: null,
    ifLoading: false,
    ifFullLoading: false,
    error: null,
    searchVidNmu: 0,
    popularVidNmu: 0,
    searchImgNmu: 0,
    popularImgNmu: 0,
    myKey: null,
    keyName: null,
    keyId: null,
    keyDate: null,
    keyMeta: null,
    openMyModal: false,
    openMyKeyModal: false,
    polls: {
      items: {},
      ifLoading: false,
      error: null,
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchVotes.pending, handlePending)
      .addCase(fetchVotes.fulfilled, (state, action) => {
        state.polls.ifLoading = false;
        state.polls.error = null;
        state.polls.items = action.payload;
        //console.log(state.polls.items);
      })
      .addCase(fetchVotes.rejected, handleRejected)
      .addCase(addVote.pending, handlePending)
      .addCase(addVote.fulfilled, (state, action) => {
        state.polls.ifLoading = false;
        state.polls.error = null;
        state.polls.items = action.payload;
      })
      .addCase(addVote.rejected, handleRejected)
      .addCase(fetchPopularVideos.pending, state => {
        state.ifLoading = true;
      })
      .addCase(fetchPopularVideos.fulfilled, (state, action) => {
        state.ifLoading = false;
        state.error = null;
        state.popularVideos = action.payload;
        state.popularVidNmu = state.popularVideos.length;
      })
      .addCase(fetchPopularVideos.rejected, (state, action) => {
        state.ifLoading = false;
        state.error = action.payload;
      })

      .addCase(fetchMorePopularVideos.pending, state => {
        state.ifLoading = true;
      })
      .addCase(fetchMorePopularVideos.fulfilled, (state, action) => {
        state.ifLoading = false;
        state.error = null;
        state.popularVideos = action.payload;
        state.popularVidNmu = state.popularVideos.length;
      })
      .addCase(fetchMorePopularVideos.rejected, (state, action) => {
        state.ifLoading = false;
        state.error = action.payload;
      })

      .addCase(searchVideos.pending, state => {
        state.ifLoading = true;
      })
      .addCase(searchVideos.fulfilled, (state, action) => {
        state.ifLoading = false;
        state.error = null;
        state.searchedVideos = action.payload;
        state.searchVidNmu = state.searchedVideos.length;
      })
      .addCase(searchVideos.rejected, (state, action) => {
        state.ifLoading = false;
        state.error = action.payload;
      })

      .addCase(searchMoreVideos.pending, state => {
        state.ifLoading = true;
      })
      .addCase(searchMoreVideos.fulfilled, (state, action) => {
        state.ifLoading = false;
        state.error = null;
        state.searchedVideos = action.payload;
        state.searchVidNmu = state.searchedVideos.length;
      })
      .addCase(searchMoreVideos.rejected, (state, action) => {
        state.ifLoading = false;
        state.error = action.payload;
      })

      .addCase(fetchVidWord.fulfilled, (state, action) => {
        state.searchVidWord = action.payload;
      })
      .addCase(fetchPopularImages.pending, state => {
        state.ifLoading = true;
      })
      .addCase(fetchPopularImages.fulfilled, (state, action) => {
        state.ifLoading = false;
        state.error = null;
        state.popularImages = action.payload.photos;
        state.popularImgNmu = state.popularImages.length;
      })
      .addCase(fetchPopularImages.rejected, (state, action) => {
        state.ifLoading = false;
        state.error = action.payload;
      })

      .addCase(searchImages.pending, state => {
        state.ifLoading = true;
      })
      .addCase(searchImages.fulfilled, (state, action) => {
        state.ifLoading = false;
        state.error = null;
        state.searchedImages = action.payload.photos;
        state.searchImgNmu = state.searchedImages.length;
      })
      .addCase(searchImages.rejected, (state, action) => {
        state.ifLoading = false;
        state.error = action.payload;
      })

      .addCase(searchMoreImages.pending, state => {
        state.ifLoading = true;
      })
      .addCase(searchMoreImages.fulfilled, (state, action) => {
        state.ifLoading = false;
        state.error = null;
        state.searchedImages = action.payload.photos;
        state.searchImgNmu = state.searchedImages.length;
      })
      .addCase(searchMoreImages.rejected, (state, action) => {
        state.ifLoading = false;
        state.error = action.payload;
      })

      .addCase(fetchImgWord.fulfilled, (state, action) => {
        state.searchImgWord = action.payload;
      })
      .addCase(fetchSavedVideos.pending, state => {
        state.ifLoading = true;
      })
      .addCase(fetchSavedVideos.fulfilled, (state, action) => {
        state.ifLoading = false;
        state.error = null;
        state.savedVideos = action.payload;
      })
      .addCase(fetchSavedVideos.rejected, (state, action) => {
        state.ifLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchSavedImages.pending, state => {
        state.ifLoading = true;
      })
      .addCase(fetchSavedImages.fulfilled, (state, action) => {
        state.ifLoading = false;
        state.error = null;
        state.savedImages = action.payload;
      })
      .addCase(fetchSavedImages.rejected, (state, action) => {
        state.ifLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteImages.pending, state => {
        state.ifLoading = true;
      })
      .addCase(deleteImages.fulfilled, (state, action) => {
        state.ifLoading = false;
        state.error = null;
        const myIndex = state.savedImages.findIndex(
          image => image.id === action.payload
        );
        state.savedImages.splice(myIndex, 1);
      })
      .addCase(deleteImages.rejected, (state, action) => {
        state.ifLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteVideos.pending, state => {
        state.ifLoading = true;
      })
      .addCase(deleteVideos.fulfilled, (state, action) => {
        state.ifLoading = false;
        state.error = null;

        const myIndex = state.savedVideos.findIndex(
          video => video.id === action.payload
        );
        state.savedVideos.splice(myIndex, 1);
      })
      .addCase(deleteVideos.rejected, (state, action) => {
        state.ifLoading = false;
        state.error = action.payload;
      })
      .addCase(createKey.pending, state => {
        state.ifFullLoading = true;
        state.error = null;
      })
      .addCase(createKey.fulfilled, (state, action) => {
        state.ifFullLoading = false;
        state.error = null;
        state.myKey = action.payload.key;
        state.keyName = action.payload.name;
        state.keyId = action.payload.customAccountId;
        state.keyMeta = action.payload.customMetaData.metadata_val;
      })
      .addCase(createKey.rejected, (state, action) => {
        state.ifFullLoading = false;
        state.error = action.payload;
      })
      .addCase(retrieveKey.pending, state => {
        state.ifLoading = true;
        state.error = null;
      })
      .addCase(retrieveKey.fulfilled, (state, action) => {
        state.ifLoading = false;
        state.error = null;
        state.myKey = action.payload.apiKey;
        state.keyName = action.payload.apiKeyName;
        state.keyId = action.payload.apiAccountId;
        state.keyDate = action.payload.apiCreationDate;
        state.keyMeta = action.payload.apiMetaData;
      })
      .addCase(retrieveKey.rejected, (state, action) => {
        state.ifLoading = false;
        state.error = action.payload;
      })

      .addCase(updateKey.pending, state => {
        state.ifFullLoading = true;
        state.error = null;
      })
      .addCase(updateKey.fulfilled, (state, action) => {
        state.ifFullLoading = false;
        state.error = null;
        state.keyName = action.payload.name;
        state.keyId = action.payload.customAccountId;
        state.keyMeta = action.payload.customMetaData.metadata_val;
      })
      .addCase(updateKey.rejected, (state, action) => {
        state.ifFullLoading = false;
        state.error = action.payload;
      })

      .addCase(deleteKey.pending, state => {
        state.ifFullLoading = true;
        state.error = null;
      })
      .addCase(deleteKey.fulfilled, (state, action) => {
        state.ifFullLoading = false;
        state.error = null;
        state.myKey = null;
        state.keyName = null;
        state.keyId = null;
        state.keyMeta = null;
      })
      .addCase(deleteKey.rejected, (state, action) => {
        state.ifFullLoading = false;
        state.error = action.payload;
      })

      .addCase(openModal.fulfilled, (state, action) => {
        state.openMyModal = action.payload;
      })

      .addCase(closeModal.fulfilled, (state, action) => {
        state.openMyModal = action.payload;
      })

      .addCase(openKeyModal.fulfilled, (state, action) => {
        state.openMyKeyModal = action.payload;
      })

      .addCase(closeKeyModal.fulfilled, (state, action) => {
        state.openMyKeyModal = action.payload;
      });
  },
});

export const appReducer = appSlice.reducer;
