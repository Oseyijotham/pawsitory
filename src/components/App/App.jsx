import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { SharedLayout } from '../SharedLayout/SharedLayout';
import { AuthLoginRoute } from '../AuthLoginRoute/AuthLoginRoute';
import { AuthRegisterRoute } from '../AuthRegisterRoute/AuthRegisterRoute';
import { SecureRoute } from '../SecureRoute/SecureRoute';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { refreshUser, logUserOut } from '../../redux/Auth/operations';
import { useSelector } from 'react-redux';
import { selectIfRefreshing, selectToken } from '../../redux/Auth/selectors';
import {
  fetchPopularVideos,
  fetchPopularImages,
  retrieveKey,
  fetchCatImages,
} from '../../redux/Application/operations';
import { jwtVerify } from 'jose';

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

const CatPictures = lazy(() => import('../CatPictures/Pictures'));

const CatPicturesCollection = lazy(() => import('../CatPictureCollection/PictureCollection'));

export const App = () => {
  const ifRefreshing = useSelector(selectIfRefreshing);
  const token = useSelector(selectToken);
  const dispatch = useDispatch();

async function verifyJWT(token, secretOrPrivateKey, algorithm = 'HS256') {
  // Convert the secret key into a Buffer
  const secretKey = Buffer.from(secretOrPrivateKey);

  try {
    // Verify the token using the secret key
    const { payload, protectedHeader } = await jwtVerify(token, secretKey, {
      algorithms: [algorithm]
    });


    return payload; // Return the decoded payload if verification is successful
  } catch (error) {
    console.error('JWT verification failed:', error.message);
    return null;
  }
}


  useEffect(() => {
    const secretKey = 'thisisaverysecurekey1234567890';
    if (!token) return;

    let interval;

    const runVerification = async () => {
      const decoded = await verifyJWT(token, secretKey);

      if (!decoded) {
        dispatch(logUserOut());
        return;
      }

      const { exp } = decoded;

      const checkExpiry = () => {
        const currentTime = Math.floor(Date.now() / 1000);

        if (exp - currentTime <= 120) {
          alert('Session timeout');
          dispatch(logUserOut());
          clearInterval(interval);
        }
      };

      checkExpiry();
      interval = setInterval(checkExpiry, 1000);
    };

    runVerification();

    return () => clearInterval(interval);
  }, [token, dispatch]);


  useEffect(() => {
    dispatch(refreshUser());
    dispatch(fetchPopularVideos());
    dispatch(fetchPopularImages());
    dispatch(retrieveKey());
    dispatch(fetchCatImages());
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
          path="catPictures"
          element={<SecureRoute redirectTo="/" component={<CatPictures />} />}
        />

        <Route
          path="catPicturesCollection"
          element={<SecureRoute redirectTo="/" component={<CatPicturesCollection />} />}
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
