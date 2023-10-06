import {PhotoWithSubType} from "api/types";
import styles from './Photo.module.scss'
import {useAppDispatch} from "redux/store";
import {api} from "api/api";

const Photo = ({photo}: { photo: PhotoWithSubType }) => {
    const dispatch = useAppDispatch()
    const subscribe = () => {
        dispatch(api.util.updateQueryData('getPhotos', undefined, draftPhotos => {
            const index = draftPhotos.album.findIndex(draft => draft.id === photo.id);
            if (index !== -1) {
                draftPhotos.album.splice(index, 1,{...draftPhotos.album[index],subscription:!draftPhotos.album[index].subscription});
            }
        }))
    }
    return (
        <div className={styles.photoContainer}>
            <img className={styles.photoImage} src={photo.url} alt={`${photo.id}photo`}/>
            <div className={styles.photoInfo}>
                ID: {photo.id}
            </div>
            <h4 className={styles.photoInfo}>
                {photo.title}
            </h4>
            <button onClick={subscribe}
                    className={styles.addToFavButton}>{photo.subscription ? 'Remove from favourites' : 'Add to favourites'}</button>
        </div>
    );
};

export default Photo;