'use client';

import { useUserProfile } from "@/hooks/useUserProfile";
import { getChart } from "@/lib/api/chart";
import { getPlaylists } from "@/lib/api/myPlaylist";
import { MyPlaylist } from "@/types/user/myPlaylist";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import ThumbnailGrid from "../myPage/myplaylist/ThumbnailGrid";
import Link from "next/link";
import Skeleton from "@mui/material/Skeleton";

function Dashboard() {
    const { data: session } = useSession();
    const { data: user } = useUserProfile(session);

    const { data: playlistsOfApi, isLoading : isApiLoading, error : isApiError } = useQuery<any, Error>({
        queryKey: ['playlistsOfApi', 'playlistsOfApi'],
        queryFn: () =>  getChart.getGlobalTracks('playlists'),
        staleTime: 1000 * 60 * 30,
    });

    const { data: playlistsOfUser, isLoading : isUserLoading, error : isUserError } = useQuery<MyPlaylist[]>({
        queryKey: ['myplaylist', user?.id],
        queryFn: () => getPlaylists(),
        enabled: !!user?.id,
        staleTime: 0,
    });

    const userPlaylistCount = playlistsOfUser?.length ?? 0;

    // 로그인 완료 && 가지고 있는 플레이리스트가 1개 이상일 때 dashboard에 표시
    const showMyMusic = !!user && userPlaylistCount > 0;

    // 2개 이상일 때는 그리드 뷰, 1개일 때는 싱글 뷰를 처리하기 위한 조건
    const hasMultiplePlaylists = userPlaylistCount > 1;

    // API 플레이리스트 데이터 중 첫 번째 곡 확보
    const firstApiPlaylist = playlistsOfApi?.[0];

    // 플레이리스트 있으면 마이페이지로, 아니면 API 플레이리스트 상세 페이지로 이동
    const targetLink = user
        ? `/mypage?tab=myplaylist`
        : `/playlist/${firstApiPlaylist?.id}`;

    if (isApiLoading || isUserLoading) {
        return (
            <Skeleton variant="rectangular" width={390} height={177} sx={{ margin: '0 auto 25px' }} />
        );
    }

    if (isApiError || isUserError) { return null; }
    
    return (
    <>
        <div className="myMusic-container">
            <div className="overlay" />
            <Link href={targetLink} style={{width: '100%', height: '100%'}} >
            
                {/* 않았을 때(비로그인 or 플리 0개) 데코 이미지를 보여줍니다 */}
                {!hasMultiplePlaylists && (
                    <Image src='/imgs/dashboard_deco.png' alt="deco img" fill className="dashboard-deco"/>
                )}

                <div className={`img-grid ${hasMultiplePlaylists ? '' : 'single-item'}`}>
                    {showMyMusic ? (
                        // 1. 로그인 완료 & 저장한 플레이리스트 있을 때
                        hasMultiplePlaylists ? (
                            playlistsOfUser?.slice(0, 2).map((item, i) => (
                                <ThumbnailGrid key={i} thumbnails={item.thumbnails} className={'img-box large-thumbnail'} />
                            ))
                        ) : (
                            // 플레이리스트가 딱 1개만 있을 때
                            playlistsOfUser?.[0] && (
                                <div className="img-box large-thumbnail">
                                    <Image
                                        // 썸네일 배열의 첫 번째 이미지 혹은 기본 디렉토리 이미지 사용
                                        src={playlistsOfUser[0].thumbnails?.[0] || '/imgs/default.png'}
                                        alt="thumbnail of single playlist"
                                        fill
                                        className="img"
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                            )
                        )
                    ) : (
                        // 2. 비로그인 상태이거나 저장한 플레이리스트 없을 때
                        firstApiPlaylist && (
                            <div className="img-box large-thumbnail">
                                <Image
                                    src={firstApiPlaylist?.picture_medium}
                                    alt="thumbnail of Api data"
                                    fill
                                    className="img"
                                />
                            </div>
                        )
                    )}
                </div>

                <div className="myMusic-text-absolute">
                    <div className="myMusic-text-content">
                        <h2 className="myMusic-text">
                            {/* 플레이리스트가 존재 유뮤에 따른 텍스트 */}
                            {showMyMusic ? 'MY뮤직.exe' : 'WELCOME-디스크.exe'}
                        </h2>
                        <div>
                            <Image
                                src='/icons/play.svg'
                                alt='이미지'
                                width={14}
                                height={18}
                                style={{ objectFit: 'cover' }}
                                />
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    </>
    )
}

export default Dashboard