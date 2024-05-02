import React, { useEffect, useState } from 'react';
import './VideoLogs.css';
import { storage } from '../../firebase-config';
import { ref, listAll, getDownloadURL, getMetadata } from "firebase/storage";

const VideoLogs = () => {
    const [videos, setVideos] = useState([]);
    const [objectFilters, setObjectFilters] = useState([]);
    const [peopleFilters, setPeopleFilters] = useState([]);
    const [sortOrder, setSortOrder] = useState('asc'); // 'asc' for ascending, 'desc' for descending



    const parseMetadata = (metadata) => {
        if (!metadata || !metadata.customMetadata) {
            return { objects: [], people: [], timestamp: 'N/A' };
        }
    
        try {
            // Extract the JSON-like string from customMetadata
            const metaDataString = metadata.customMetadata.customMetadata;
            //console.log('metadata string:', metaDataString);
    
            // Initialize a variable to hold the parsed object
            let parsedMetadata;
            //console.log('{' + typeof metaDataString + '} ' + JSON.stringify(metaDataString));
            // Check if the metaDataString is a string that needs parsing
            if (typeof metaDataString === 'string') {
                // Replace single quotes with double quotes to form valid JSON and parse it
                const validJsonString = metaDataString.replace(/'/g, '"');
                parsedMetadata = JSON.parse(validJsonString);
                console.log('metadata string after parsing:', parsedMetadata);
            } else {
                // If it's already an object, use it directly
                parsedMetadata = metaDataString;
            }
    
            // Extracting individual components from the parsed metadata
            const objects = parsedMetadata.objects || [];
            const people = parsedMetadata.people || [];
            const timestamp = parsedMetadata.timestamp ? new Date(parsedMetadata.timestamp).toISOString() : 'N/A';
    
            return { objects, people, timestamp };
        } catch (error) {
            console.error("Failed to parse metadata:", error);
            return { objects: [], people: [], timestamp: 'N/A' };
        }
    };
    
    

    useEffect(() => {
        const fetchVideos = async () => {
            const videosRef = ref(storage, 'videos/');
            try {
                const videoFilesSnapshot = await listAll(videosRef);
                const filesData = await Promise.all(videoFilesSnapshot.items.map(async item => {
                    const url = await getDownloadURL(item);
                    const metadata = await getMetadata(item);
                    
  
                    const { objects, people, timestamp } = parseMetadata(metadata);
                    
                    console.log(objects, people, timestamp);


                    console.log('(' + typeof objects + ') parsedObjects: ' + objects + ' (' + typeof people + ')'
                    +'parsedPeople: ' + people + ' (' + typeof timestamp + ') parsedTimestamp: ' + timestamp);
                    return {
                        url,
                        name: item.name,
                        timestamp: timestamp,
                        objects: objects.join(', '), 
                        people: people.join(', ') 
                    };
                }));

                setVideos(filesData.sort((a, b) => sortOrder === 'asc' ? new Date(a.timestamp) - new Date(b.timestamp) : new Date(b.timestamp) - new Date(a.timestamp)));
            } catch (error) {
                console.error("Error fetching videos:", error);
            }
        };

        fetchVideos();
    }, [sortOrder]);

    const handleObjectFilterChange = (event) => {
        const value = event.target.value;
        setObjectFilters(filters => 
            filters.includes(value) ? filters.filter(filter => filter !== value) : [...filters, value]
        );
    };

    const handlePeopleFilterChange = (event) => {
        const value = event.target.value;
        setPeopleFilters(filters => 
            filters.includes(value) ? filters.filter(filter => filter !== value) : [...filters, value]
        );
    };

    const filteredVideos = videos.filter(video => {
        const objectMatches = objectFilters.length === 0 || objectFilters.every(obj => video.objects.includes(obj));
        const peopleMatches = peopleFilters.length === 0 || peopleFilters.every(person => video.people.includes(person));
        return objectMatches && peopleMatches;
    });

    const handleSortChange = (e) => {
        setSortOrder(e.target.value);
    };

    return (
        <div className="VideoLogs-page">
            <aside className="filter-sidebar">
                <div className="filter-controls">
                    <div className="sort-controls">
                        <label>Sort by Time:</label>
                        <select onChange={handleSortChange} value={sortOrder}>
                            <option value="asc">Oldest First</option>
                            <option value="desc">Newest First</option>
                        </select>
                    </div>
                    <div className="filter">
                        <h3>Detected People:</h3>
                        <div>
                            <label><input type="checkbox" value="Sirena" onChange={handlePeopleFilterChange} checked={peopleFilters.includes('Sirena')} /> Sirena</label>
                            <label><input type="checkbox" value="Diego" onChange={handlePeopleFilterChange} checked={peopleFilters.includes('Diego')} /> Diego</label>
                            <label><input type="checkbox" value="Fatima" onChange={handlePeopleFilterChange} checked={peopleFilters.includes('Fatima')} /> Fatima</label>
                        </div>
                    </div>
                    <div className="filter">
                        <h3>Detected Objects:</h3>
                        <div>
                            <label><input type="checkbox" value="person" onChange={handleObjectFilterChange} checked={objectFilters.includes('person')} /> Person</label>
                            <label><input type="checkbox" value="car" onChange={handleObjectFilterChange} checked={objectFilters.includes('car')} /> Car</label>
                            <label><input type="checkbox" value="dog" onChange={handleObjectFilterChange} checked={objectFilters.includes('dog')} /> Dog</label>
                            <label><input type="checkbox" value="bus" onChange={handleObjectFilterChange} checked={objectFilters.includes('bus')} /> Bus</label>
                            <label><input type="checkbox" value="truck" onChange={handleObjectFilterChange} checked={objectFilters.includes('truck')} /> Truck</label>
                            <label><input type="checkbox" value="cat" onChange={handleObjectFilterChange} checked={objectFilters.includes('cat')} /> Cat</label>
                        </div>
                    </div>
                </div>
            </aside>
            <div className="video-list">
                {filteredVideos.map((video, index) => (
                    <div key={video.name} className="video-item">
                        <video width="320" height="240" controls>
                            <source src={video.url} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                        <div>Detected Objects: {video.objects}</div>
                        <div>Detected People: {video.people}</div>
                        <div>File Name: {video.name}</div>
                        <div>Timestamp: {video.timestamp}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VideoLogs;
