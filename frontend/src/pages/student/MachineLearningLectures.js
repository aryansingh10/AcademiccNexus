import React from 'react';

const MachineLearningLectures = () => {
    // Define an array of lecture data with titles and YouTube video IDs
    const lectures = [
      
        { title: 'Real Numbers', videoId: 'ROO4_CmtUQc' },
        { title: 'Introduction to Polynomials ', videoId: 'TXohkKWUqvE' },
        { title: 'Introduction to Pair of Linear Eq in Two Variables', videoId: 'Cghu-H6eht0' },
        
    
    
      
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
