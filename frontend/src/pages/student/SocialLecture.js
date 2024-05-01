import React from 'react';

const SocialScience = () => {
    // Define an array of lecture data with titles and YouTube video IDs
    const lectures = [
        { title: 'Making of the Global World', videoId: 'W1Gx4FjKJTo?si=yyQ25p5REMpdEYmm' },
        { title: 'The Rise of Nationalism', videoId: 'GDlWkr6sAT4?si=MnF3tMk-JaCgCDHD' },
        { title: 'Nationalism in India', videoId: 'HP1kdhvZGzc?si=WIdNwP9VhJ26n10F' },
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

export default SocialScience;
