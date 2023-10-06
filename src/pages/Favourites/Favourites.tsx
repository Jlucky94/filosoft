import {useGetPhotosQuery} from "api/api";
import Photo from "components/Photo";
import {useNavigate} from "react-router-dom";
import {useLayoutEffect} from "react";

const Favourites = () => {
    const navigate = useNavigate()
    const {data} = useGetPhotosQuery(undefined)
    const favList = data?.album.filter(photo => photo.subscription).map((photo) => <Photo key={photo.id} photo={photo}/>);

    const goToDashBoardPage=()=> navigate('/')
    useLayoutEffect(() => {
        window.scrollTo(0, 0)
    },[])
    return (
        <div>
            <button
                onClick={goToDashBoardPage}
                style={{
                    position: 'fixed',
                    top: '20px',
                    right: '20px',
                    backgroundColor:'#ffa423',
                    color:'#000000'
                }}
            >
                Go to dashboard
            </button>
            {favList}
        </div>
    );
};

export default Favourites;