import css from './VideoCollection.module.css';
import { Fancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';
import { useEffect } from 'react';
import { Loader } from '../InitLoader/Loader';
import videoFolder from './video-folder.png'
import { useDispatch } from 'react-redux';
import {
  fetchSavedVideos,
  deleteVideos,
} from '../../redux/Application/operations';
import { useSelector } from 'react-redux';
import {selectSavedVideos} from '../../redux/Application/selectors';


export const VideoCollection = () => {
  const dispatch = useDispatch();
  const savedVideos = useSelector(selectSavedVideos);

   const handlePress = evt => {
     evt.target.style.boxShadow = 'inset 0 0 10px 5px rgba(0, 0, 0, 0.3)';
     setTimeout(() => {
       evt.target.style.boxShadow = 'none';
     }, 2000);
     const myId = evt.target.name;
     dispatch(deleteVideos(myId));
   };


 useEffect(() => {
   Fancybox.bind("[data-fancybox='gallery']", {
     // Custom options
   });

   // Cleanup function
   return () => {
     Fancybox.destroy();
   };
 }, [savedVideos]);
  
  useEffect(() => {
    dispatch(fetchSavedVideos());
  }, [dispatch]);

  return (
    <main>
      <span className={css.titleContainer}>
        <img
          src={videoFolder}
          className={css.icon}
          style={{ width: '100px' }}
          alt=""
        />

        <span>
          <span className={css.movieGalleryLabel}> Your Videos</span>
        </span>

        <img
          src={videoFolder}
          className={css.iconTwo}
          style={{ width: '100px' }}
          alt=""
        />
      </span>
      <div className={css.galleryFrame}>
        <Loader />
        {savedVideos.length !== 0 ? (
          <ul className={`${css.movieGallery} gallery`}>
            {savedVideos.map(searchedVideo => (
              <li
                key={searchedVideo.video_files[2].id}
                className={css.movieItem}
              >
                <a
                  href={searchedVideo.video_files[0].link}
                  data-fancybox="gallery"
                >
                  <video
                    className={css.movieImage}
                    src={searchedVideo.video_files[2].link}
                    controls
                  ></video>
                </a>
                <button
                  className={css.liker}
                  name={searchedVideo.id}
                  onClick={handlePress}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className={css.message}>Your collection is empty</div>
        )}
      </div>
    </main>
  );
};

export default VideoCollection;
