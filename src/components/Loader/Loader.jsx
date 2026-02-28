
import { ThreeCircles } from 'react-loader-spinner';
import css from './Loader.module.css';
import {selectFullLoading} from '../../redux/Application/selectors';
import { useSelector } from 'react-redux';


export const FullLoader = () => {
  const ifFullLoading = useSelector(selectFullLoading);

  return (
    <>
      {ifFullLoading && (
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


