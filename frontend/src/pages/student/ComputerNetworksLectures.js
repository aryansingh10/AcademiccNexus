import React from 'react';

const ComputerNetworksLectures = () => {
    // Define an array of lecture data with titles and YouTube video IDs
    const lectures = [
        { title: 'A Triumph of surgery', videoId: 'sAgRPfiTOA0?si=bfZ-uVPpXTKnZYEL' },
        { title: 'Nelson Mandela', videoId: 'O1PocKoabTo?si=tYm3woOxy8FXBC_u' },
        { title: 'Two Stories About Flying', videoId: 'ZTmmJZZhljE?si=XahqgG7dwnVrOw_U' },
        // { title: 'Network Protocols and Layers', videoId: 'VIDEO_ID_2' },
        // { title: 'Routing and Switching', videoId: 'VIDEO_ID_3' },
        // Add more lectures as needed
    ];


    return (
        <div>
            <h1> English Lecture</h1>
            <ul>
                {lectures.map((lecture, index) => (
                    <li key={index}>
                        <h2>{lecture.title}</h2>
                        <div>
                            {/* Embed YouTube video using the video ID */}
                            <iframe
                                width="560"
                                height="315"
                                src={`https://www.youtube.com/embed/${lecture.videoId}`}
                                title={lecture.title}
                                frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowfullscreen
                            ></iframe>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ComputerNetworksLectures;
