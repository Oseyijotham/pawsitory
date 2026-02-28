
import { ThreeCircles } from 'react-loader-spinner';
import css from './Loader.module.css';
import { selectIfLoading } from '../../redux/Auth/selectors';
import { useSelector } from 'react-redux';


export const Loader = () => {
  const ifLoading = useSelector(selectIfLoading);

  return (
    <>
      {ifLoading && (
        <div className={css.backDrop}>
          <ThreeCircles
            visible={true}
            height="80"
            width="80"
            color="blue"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass={css.loader}
          />
        </div>
      )}
    </>
  );
};


