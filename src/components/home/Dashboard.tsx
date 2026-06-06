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

function Dashboard() {
    // const imageList = [
    //     '/imgs/415330480_64a747db_s.jpg',
    //     '/imgs/426181497_667b8267_s.jpg',
    //     '/imgs/426178480_6674c90f_s.jpg',
    //     '/imgs/413139838_643f8487_s.jpg',
    //     '/imgs/404302018_5e17e201.jpg',
    //     '/imgs/407897323_6346225e_s.jpg',
    //     '/imgs/423081851_65f3de3e_s.jpg',
    //     '/imgs/400106044_61775d1b_o.jpg',
    // ];
    const { data: session } = useSession();
    const { data: user } = useUserProfile(session);

    const { data: playlistsOfApi, isLoading, error } = useQuery<any, Error>({
        queryKey: ['playlistsOfApi', 'playlistsOfApi'],
        queryFn: () => {
            return getChart.getGlobalTracks('playlists');
        },
        staleTime: 1000 * 60 * 30,
    });

    const { data: playlistsOfUser } = useQuery<MyPlaylist[]>({
        queryKey: ['myplaylist', user?.id],
        queryFn: () => getPlaylists(),
        enabled: !!user?.id,
        staleTime: 0,
    });

    // 1. 복수 조건 체크 (기본값 0을 제공하여 undefined 방지)
    const hasMultiplePlaylists = user && (playlistsOfUser?.length ?? 0) > 1;

    // 2. 비로그인 시 첫 번째 API 플레이리스트 가져오기
    const firstApiPlaylist = playlistsOfApi?.[0];

    const targetLink = user
        ? `/mypage?tab=myplaylist`
        : `/playlist/${firstApiPlaylist?.id}`;

    if (isLoading || error) return;
    
    return (
    <>
        <div className="myMusic-container">
            <div className="overlay" />
            <Link href={targetLink} style={{width: '100%', height: '100%'}} >
                {!hasMultiplePlaylists && (<Image src='/imgs/dashboard_deco.png' alt="deco img" fill className="dashboard-deco"/>)}
                <div className={`img-grid ${hasMultiplePlaylists ? '' : 'single-item'}`}>
                    {user ? (
                        // 로그인 상태
                        playlistsOfUser?.slice(0, 2).map((item, i) => (
                            <ThumbnailGrid key={i} thumbnails={item.thumbnails} className={'img-box large-thumbnail'} />
                        ))
                    ) : (
                        // 비로그인 상태
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
                            {user ? 'MY뮤직.exe' : ('WELCOME-디스크.exe')}
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