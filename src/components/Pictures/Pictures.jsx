import css from './Pictures.module.css';
import { Loader } from '../InitLoader/Loader';
import { useEffect } from 'react';
import imagePic from './photo.png';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
  selectLoading,
  selectSearchedImgWord,
  selectSearchedImages,
  selectPopularImages,
} from '../../redux/Application/selectors';
import {
  searchImages,
  saveImages,
  fetchImgWord,
  searchMoreImages,
} from '../../redux/Application/operations';

export const Pictures = () => {
  const dispatch = useDispatch();
  const searchedImages = useSelector(selectSearchedImages);
  const searchedImgWord = useSelector(selectSearchedImgWord);
  const ifLoading = useSelector(selectLoading);
  const popularImages = useSelector(selectPopularImages);
  const handleSubmit = evt => {
    evt.preventDefault();
    evt.target.elements.button.style.boxShadow =
      'inset 0 0 10px 5px rgba(0, 0, 0, 0.3)';
    setTimeout(() => {
      evt.target.elements.button.style.boxShadow = 'none';
    }, 2000);
    const form = evt.target;
    dispatch(searchImages(form.elements.searcher.value));
    dispatch(fetchImgWord(form.elements.searcher.value));
  };

  const handleButtonPress = (evt) => {
    evt.target.style.boxShadow = 'inset 0 0 10px 5px rgba(0, 0, 0, 0.3)';

    setTimeout(() => {
      evt.target.style.boxShadow = 'none';
    }, 2000);
    dispatch(searchMoreImages(searchedImgWord));

  }

   const handlePress = (imageFiles, evt) => {
     evt.target.style.boxShadow = 'inset 0 0 10px 5px rgba(0, 0, 0, 0.3)';

     setTimeout(() => {
       evt.target.style.boxShadow = 'none';
     }, 2000);

     

     dispatch(saveImages({ image_files: imageFiles }));
   };

  useEffect(() => {
    const lightbox = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
      closeText: 'X',
      animationSlide: false,
    });

    // Cleanup function
    return () => {
      lightbox.destroy();
    };
  }, [searchedImages]);

  /*useEffect(() => {
    dispatch(fetchPopularImages());
  }, [dispatch]); */

  return (
    <main>
      <span className={css.titleContainer}>
        <img
          src={imagePic}
          className={css.icon}
          style={{ width: '100px' }}
          alt=""
        />

        <span>
          <span className={css.movieGalleryLabel}>Pictures</span>
        </span>

        <img
          src={imagePic}
          className={css.iconTwo}
          style={{ width: '100px' }}
          alt=""
        />
      </span>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.input}
          type="text"
          autoComplete="off"
          name="searcher"
          placeholder="Search for Pictures"
        />
        <button type="submit" name="button" className={css.button}>
          <span className={css.buttonLabel}>Search</span>
        </button>
      </form>
      <div className={css.galleryFrame}>
        <Loader />
        {searchedImages.length !== 0 && searchedImgWord !== null ? (
          <ul className={`${css.movieGallery} gallery`}>
            {searchedImages.map(searchedImage => (
              <li key={searchedImage.id} className={css.movieItem}>
                <a href={searchedImage.src.landscape}>
                  <img
                    className={css.image}
                    src={searchedImage.src.medium}
                    alt={searchedImage.alt}
                  />
                </a>
                <button
                  className={css.liker}
                  onClick={evt => handlePress(searchedImage, evt)}
                >
                  Save
                </button>
              </li>
            ))}
          </ul>
        ) : searchedImages.length === 0 && searchedImgWord === null ? (
          <ul className={`${css.movieGallery} gallery`}>
            {popularImages.map(popularImage => (
              <li key={popularImage.id} className={css.movieItem}>
                <a href={popularImage.src.landscape}>
                  <img
                    className={css.image}
                    src={popularImage.src.medium}
                    alt={popularImage.alt}
                  />
                </a>
                <button
                  className={css.liker}
                  onClick={evt => handlePress(popularImage, evt)}
                >
                  Save
                </button>
              </li>
            ))}
          </ul>
        ) : (
          searchedImgWord !== null &&
          ifLoading === false && (
            <div className={css.message}>
              <p className={css.messageItem}>
                No Videos, try another search term or create API KEY if you
                haven't.
              </p>
            </div>
          )
        )}
      </div>
      <div className={css.buttonWrapper}>
        {searchedImages.length !== 0 ? (
          <button onClick={handleButtonPress} className={css.loadBtn}>
            Load More
          </button>
        ) : null}
      </div>
    </main>
  );
};

export default Pictures;

