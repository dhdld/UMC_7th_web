import Poster from "../Card/Poster";
import styled from 'styled-components';
import * as S from '../style/search.style.js'
import CardListSkeleton from '../Card/Skeleton/card-list-skeleton.jsx';
import { useGetInfiniteMovies } from "../../hooks/queries/useGetInfiniteMovies.js";
import {useInView} from "react-intersection-observer";
import { useEffect } from "react";
import {ClipLoader} from "react-spinners";

const Popular = () => {
    const {data:movies,
        isLoading,
        isFetching,
        hasNextPage,
        isPending,
        fetchNextPage,
        isFetchNextPage,
        error,
        isError
    } = useGetInfiniteMovies('popular')

    const {ref, inView} = useInView({
        threshold: 0,
    })

    useEffect(()=>{
        if(inView){
            !isFetching && hasNextPage && fetchNextPage();
        }
    }, [inView, isFetching, hasNextPage, fetchNextPage])

    console.log(movies)

    if (isPending) return (
        <S.MovieGridContainer>
        <CardListSkeleton />
    </S.MovieGridContainer>
    );

    return (
        <>
        <Posters>
            {movies?.pages
                ?.map(page=>page.results)
                ?.flat()
                ?.map((movie, _)=>(
                    <Poster 
                    key={movie.id} 
                    id={movie.id} 
                    coverImg={movie.poster_path} 
                    title={movie.title} 
                    release_date={movie.release_date} 
                />
                )
            )}
            {isFetching && <CardListSkeleton />}
            <div ref={ref}>
            {isFetching && <ClipLoader color="#fff" />}
        </div>
        </Posters>
        </>
    );
};

export default Popular;

const Posters = styled.div`
   display: inline-flex;
    flex-wrap: wrap;
    gap: 20px;
    margin: 20px;
`;