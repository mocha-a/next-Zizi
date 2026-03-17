'use client';

import Image from "next/image";

function Dashboard() {
    const imageList = [
        '/imgs/415330480_64a747db_s.jpg',
        '/imgs/426181497_667b8267_s.jpg',
        '/imgs/426178480_6674c90f_s.jpg',
        '/imgs/413139838_643f8487_s.jpg',
        '/imgs/404302018_5e17e201.jpg',
        '/imgs/407897323_6346225e_s.jpg',
        '/imgs/423081851_65f3de3e_s.jpg',
        '/imgs/400106044_61775d1b_o.jpg',
    ];

    return (
    <>
        <div className="myMusic-container">
            <div className="overlay" />
            <div className="img-grid">
                {imageList.map((src, i) => (
                <div className="img-box" key={i}>
                    <Image
                    src={src}
                    alt={`이미지 ${i + 1}`}
                    fill
                    sizes="(max-width: 100px) 100px, 100px"
                    />
                </div>
                ))}
            </div>
            <div className="myMusic-text-absolute">
                <div className="myMusic-text-content">
                    <h2 className="myMusic-text">MY뮤직.exe</h2>
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
        </div>
    </>
    )
}

export default Dashboard