import css from './Pictures.module.css';
import { Loader } from '../InitLoader/Loader';
import { useEffect } from 'react';
import imagePic from './TheCatAPI.png';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
  selectLoading,
  selectSearchedImgWord,
  selectSearchedImages,
  selectCatImages,
} from '../../redux/Application/selectors';
import {
  saveCatImages,
  fetchCatImages,
} from '../../redux/Application/operations';

export const Pictures = () => {
  const dispatch = useDispatch();
  const searchedImages = useSelector(selectSearchedImages);
  const searchedImgWord = useSelector(selectSearchedImgWord);
  const ifLoading = useSelector(selectLoading);
  const popularImages = useSelector(selectCatImages);

  const handleButtonPress = (evt) => {
    evt.target.style.boxShadow = 'inset 0 0 10px 5px rgba(0, 0, 0, 0.3)';

    setTimeout(() => {
      evt.target.style.boxShadow = 'none';
    }, 2000);
    dispatch(fetchCatImages());

  }

   const handlePress = (imageFiles, evt) => {
     evt.target.style.boxShadow = 'inset 0 0 10px 5px rgba(0, 0, 0, 0.3)';

     setTimeout(() => {
       evt.target.style.boxShadow = 'none';
     }, 2000);

     

     dispatch(saveCatImages({ image_files: imageFiles }));
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
          style={{ width: '220px' }}
          alt=""
        />

        <span>
          <span className={css.movieGalleryLabel}>Cat Pictures</span>
        </span>

        <img
          src={imagePic}
          className={css.iconTwo}
          style={{ width: '220px' }}
          alt=""
        />
      </span>
      
      <div className={css.galleryFrame}>
        <Loader />
        {popularImages.length !== 0 && (
          <ul className={`${css.movieGallery} gallery`}>
            {popularImages.map(popularImage => (
              <li key={popularImage.id} className={css.movieItem}>
                <a href={popularImage.url}>
                  <img className={css.image} src={popularImage.url} alt={popularImage.id} />
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
        )}
      </div>
      <div className={css.buttonWrapper}>
        {popularImages.length !== 0 ? (
          <button onClick={handleButtonPress} className={css.loadBtn}>
            Load More
          </button>
        ) : null}
      </div>
    </main>
  );
};

export default Pictures;

