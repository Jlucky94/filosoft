import 'pages/DashBoard/styles.css'
import {useGetPhotosQuery} from "api/api";
import Photo from "components/Photo";
import {useCallback, useLayoutEffect} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "redux/store";
import {dashBoardActions} from "redux/dashBoardSlice";

const DashBoard = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const currentPage = useAppSelector(state => state.dashBoard.page)
    const scrollYPosition = useAppSelector(state => state.dashBoard.scrollY)
    const {data, isLoading} = useGetPhotosQuery(currentPage, {refetchOnMountOrArgChange: true})

    const fetchNextPage = useCallback(() => {
        dispatch(dashBoardActions.setCurPage());
    }, []);

    const goToFavouritesPage = () => {
        navigate('/list')
        dispatch(dashBoardActions.saveScrollPosition(window.scrollY))
    }

    const list = data?.album.map(photo => (
        <Photo key={photo.id} photo={photo}/>
    ))


    useLayoutEffect(() => {
        window.scrollTo(0, scrollYPosition)
    },[])
    return (
        <div>
            <button
                onClick={goToFavouritesPage}
                style={{
                    position: 'fixed',
                    top: '20px',
                    right: '20px',
                    backgroundColor: '#ffa423',
                    color: '#000000'
                }}
            >
                Go to favourites
            </button>

            <InfiniteScroll
                next={fetchNextPage}
                hasMore={true}
                loader={isLoading}
                dataLength={data?.album.length ?? 0}
                scrollThreshold={0.9}
            >
                {list}
            </InfiniteScroll>
        </div>
    )

};

export default DashBoard;
