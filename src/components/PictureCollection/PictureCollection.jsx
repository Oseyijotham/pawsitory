import css from './PictureCollection.module.css';
import { Loader } from '../InitLoader/Loader';
import { useEffect } from 'react';
//import { Button } from '../PetScopeButton/Button';
import imagePic from './photo.png';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {selectSavedImages} from '../../redux/Application/selectors';
import {
  fetchSavedImages,
  deleteImages,
} from '../../redux/Application/operations';

export const PictureCollection = () => {
  const dispatch = useDispatch();
  const savedImages = useSelector(selectSavedImages);

  const handlePress = evt => {
    evt.target.style.boxShadow =
      'inset 0 0 10px 5px rgba(0, 0, 0, 0.3)';
    setTimeout(() => {
      evt.target.style.boxShadow = 'none';
    }, 2000);
    const myId = evt.target.name;
    
    dispatch(deleteImages(myId));
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
  }, [savedImages]);

  useEffect(() => {
    dispatch(fetchSavedImages());
  }, [dispatch]);

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
          <span className={css.movieGalleryLabel}>Your Pictures</span>
        </span>

        <img
          src={imagePic}
          className={css.iconTwo}
          style={{ width: '100px' }}
          alt=""
        />
      </span>
      <div className={css.galleryFrame}>
        <Loader />
        {savedImages.length !== 0 ? (
          <ul className={`${css.movieGallery} gallery`}>
            {savedImages.map(savedImage => (
              <li key={savedImage.id} className={css.movieItem}>
                <a href={savedImage.image_files.url}>
                  <img
                    className={css.image}
                    src={savedImage.image_files.url}
                    alt={savedImage.id}
                  />
                </a>
                <button
                  className={css.liker}
                  onClick={evt => handlePress(savedImage, evt)}
                >
                  Save
                </button>
                {console.log(savedImage)}
              </li>
            ))}
          </ul>
        ) : (
          <div className={css.message}>Your collection is empty</div>
        )}
      </div>
      {/*<Button />*/}
    </main>
  );
};

export default PictureCollection;
