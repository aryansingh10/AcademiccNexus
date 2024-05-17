import React from 'react';

const MachineLearningLectures = () => {
    // Define an array of lecture data with titles and YouTube video IDs
    const lectures = [
      
        { title: 'Indefinite Integration Part01', videoId:'LytMwKXqI78' },
        { title: 'Indefinite Integration Part02', videoId:'QPfYlmiqChY' },
        { title: 'Indefinite Integration Part03', videoId: 'vq5qbZwP20s' },
        
    
    
    ];

    return (
        <div>
            <h1>Mathematics</h1>
            <ul>
                {lectures.map((lecture, index) => (
                    <li key={index}>
                        <h2>{lecture.title}</h2>
                        <div>
                            {/* Embed YouTube video using the video ID */}
                            <iframe
                                width="560"
                                height="315"
                                src={`https://www.youtube.com/embed/${lecture.videoId}?rel=0`}
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

export default MachineLearningLectures;
