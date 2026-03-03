import css from './Videos.module.css';
import { Fancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';
import { useEffect } from 'react';
import { Loader } from '../InitLoader/Loader';
import vidIcon from './vid.png';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
  selectSearchedVideos,
  selectSearchedVidWord,
  selectLoading,
  selectPopularVideos,
} from '../../redux/Application/selectors';
import {
  saveVideos,
  fetchMorePopularVideos,
} from '../../redux/Application/operations';

export const Videos = () => {
  const dispatch = useDispatch();
  const searchedVideos = useSelector(selectSearchedVideos);
  const searchedVidWord = useSelector(selectSearchedVidWord);
  const ifLoading = useSelector(selectLoading);
  const popularVideos = useSelector(selectPopularVideos);

  const handleButtonPress = (evt) => {
     evt.target.style.boxShadow = 'inset 0 0 10px 5px rgba(0, 0, 0, 0.3)';

     setTimeout(() => {
       evt.target.style.boxShadow = 'none';
     }, 2000);
    dispatch(fetchMorePopularVideos());
  }

 const handlePress = (videoFiles, evt) => {
   evt.target.style.boxShadow = 'inset 0 0 10px 5px rgba(0, 0, 0, 0.3)';

   setTimeout(() => {
     evt.target.style.boxShadow = 'none';
   }, 2000);

   console.log(videoFiles); // Log the array of video files

   dispatch(saveVideos({ video_files: videoFiles }));
 };

  useEffect(() => {
    Fancybox.bind("[data-fancybox='gallery']", {
      // Custom options
    });

    // Cleanup function
    return () => {
      Fancybox.destroy();
    };
  }, [searchedVideos]);

  return (
    <main>
      <span className={css.titleContainer}>
        <img
          src={vidIcon}
          className={css.icon}
          style={{ width: '100px' }}
          alt=""
        />

        <span>
          <span className={css.movieGalleryLabel}>Videos</span>
        </span>

        <img
          src={vidIcon}
          className={css.iconTwo}
          style={{ width: '100px' }}
          alt=""
        />
      </span>

      <div className={css.galleryFrame}>
        <Loader />
        {popularVideos.length !== 0 && (
          <ul className={`${css.movieGallery} gallery`}>
            {popularVideos.map(popularVideo => (
              <li
                key={popularVideo.video_files[2].id}
                className={css.movieItem}
              >
                <a
                  href={popularVideo.video_files[0].link}
                  data-fancybox="gallery"
                >
                  <video
                    className={css.movieImage}
                    src={popularVideo.video_files[2].link}
                    controls
                  ></video>
                </a>
                <button
                  className={css.liker}
                  data-id1={popularVideo.video_files}
                  onClick={evt => handlePress(popularVideo.video_files, evt)}
                >
                  Save
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className={css.buttonWrapper}>
        {popularVideos.length !== 0 ? (
          <button onClick={handleButtonPress} className={css.loadBtn}>
            Load More
          </button>
        ) : null}
      </div>
    </main>
  );
};

export default Videos;
