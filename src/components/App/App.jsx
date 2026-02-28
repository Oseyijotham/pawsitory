import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { SharedLayout } from '../SharedLayout/SharedLayout';
import { AuthLoginRoute } from '../AuthLoginRoute/AuthLoginRoute';
import { AuthRegisterRoute } from '../AuthRegisterRoute/AuthRegisterRoute';
import { SecureRoute } from '../SecureRoute/SecureRoute';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { refreshUser } from '../../redux/Auth/operations';
import { useSelector } from 'react-redux';
import { selectIfRefreshing } from '../../redux/Auth/selectors';
import {
  fetchPopularVideos,
  fetchPopularImages,
  fetchSavedVideos,
  fetchSavedImages,
  retrieveKey,
} from '../../redux/Application/operations';

const Home = lazy(() => import('../Home/Home'));
const Login = lazy(() => import('../Login/Login'));
const Register = lazy(() => import('../Register/Register'));
const PictureCollection = lazy(() =>
  import('../PictureCollection/PictureCollection')
);
const Pictures = lazy(() => import('../Pictures/Pictures'));
const VideoCollection = lazy(() =>
  import('../VideoCollection/VideoCollection')
);
const Videos = lazy(() => import('../Videos/Videos'));

export const App = () => {
  const ifRefreshing = useSelector(selectIfRefreshing);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(refreshUser());
    dispatch(fetchPopularVideos());
    dispatch(fetchPopularImages());
    //dispatch(fetchSavedVideos());
    //dispatch(fetchSavedImages());
    dispatch(retrieveKey());
  }, [dispatch]);

  return ifRefreshing ? (
    <b>Aquiring your data...</b>
  ) : (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route
          index
          element={<AuthLoginRoute redirectTo="Home" component={<Login />} />}
        />
        <Route
          path="register"
          element={
            <AuthRegisterRoute redirectTo="/" component={<Register />} />
          }
        />
          {/*<Route path="register" element={<Register />} />*/}
        <Route
          path="Home"
          element={<SecureRoute redirectTo="/" component={<Home />} />}
        />

        <Route
          path="*"
          element={<SecureRoute redirectTo="/" component={<Home />} />}
        />

        <Route
          path="pictureCollection"
          element={
            <SecureRoute redirectTo="/" component={<PictureCollection />} />
          }
        />

        <Route
          path="pictures"
          element={<SecureRoute redirectTo="/" component={<Pictures />} />}
        />

        <Route
          path="videoCollection"
          element={
            <SecureRoute redirectTo="/" component={<VideoCollection />} />
          }
        />

        <Route
          path="videos"
          element={<SecureRoute redirectTo="/" component={<Videos />} />}
        />
      </Route>
    </Routes>
  );
};
