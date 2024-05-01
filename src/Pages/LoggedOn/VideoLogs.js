import React, { useEffect, useState } from 'react';
import './VideoLogs.css';
import { storage } from '../../firebase-config';
import { ref, listAll, getDownloadURL, getMetadata } from "firebase/storage";

const VideoLogs = () => {
    const [videos, setVideos] = useState([]);
    const [objectFilters, setObjectFilters] = useState([]);
    const [peopleFilters, setPeopleFilters] = useState([]);
    const [sortOrder, setSortOrder] = useState('asc'); // 'asc' for ascending, 'desc' for descending

    useEffect(() => {
        const fetchVideos = async () => {
            const videosRef = ref(storage, 'videos/');
            try {
                const videoFilesSnapshot = await listAll(videosRef);
                const filesData = await Promise.all(videoFilesSnapshot.items.map(async item => {
                    const url = await getDownloadURL(item);
                    const metadata = await getMetadata(item);
                    return {
                        url,
                        name: item.name,
                        timestamp: metadata.customMetadata?.timestamp || new Date().toISOString(),
                        objects: metadata.customMetadata?.objects || 'None',
                        people: metadata.customMetadata?.people || 'None'
                    };
                }));

                setVideos(filesData.sort((a, b) => (sortOrder === 'asc' ? new Date(a.timestamp) - new Date(b.timestamp) : new Date(b.timestamp) - new Date(a.timestamp))));
            } catch (error) {
                console.error("Error fetching videos:", error);
            }
        };

        fetchVideos();
    }, [sortOrder]);

    const handleObjectFilterChange = (event) => {
        const value = event.target.value;
        setObjectFilters(filters => 
            filters.includes(value)
                ? filters.filter(filter => filter !== value)
                : [...filters, value]
        );
    };

    const handlePeopleFilterChange = (event) => {
        const value = event.target.value;
        setPeopleFilters(filters => 
            filters.includes(value)
                ? filters.filter(filter => filter !== value)
                : [...filters, value]
        );
    };

    const filteredVideos = videos.filter(video => {
        // Check if all selected object filters are contained within a video's objects
        const objectMatches = objectFilters.length === 0 || objectFilters.every(obj => video.objects && video.objects.includes(obj));
        // Check if all selected people filters are contained within a video's people
        const peopleMatches = peopleFilters.length === 0 || peopleFilters.every(person => video.people && video.people.includes(person));
        return objectMatches && peopleMatches;
    });

    const handleSortChange = (e) => {
        setSortOrder(e.target.value);
    };

    return (

<div className="VideoLogs-page">
            <aside className="filter-sidebar">
                <div>
                    <h3>Sort by Time:</h3>
                    <select>
                        <option value="oldest">Oldest First</option>
                        <option value="newest">Newest First</option>
                    </select>
                </div>
                <div>
                    <h3>Detected People:</h3>
                    <label><input type="checkbox" name="people" value="Sirena" /> Sirena</label>
                    <label><input type="checkbox" name="people" value="Diego" /> Diego</label>
                    <label><input type="checkbox" name="people" value="Fatima" /> Fatima</label>
                </div>
                <div>
                    <h3>Detected Objects:</h3>
                    <label><input type="checkbox" name="objects" value="Person" /> Person</label>
                    <label><input type="checkbox" name="objects" value="Car" /> Car</label>
                    <label><input type="checkbox" name="objects" value="Dog" /> Dog</label>
                    <label><input type="checkbox" name="objects" value="Cat" /> Cat</label>
                </div>
    </aside>
            <div className="video-list">
                {filteredVideos.map((video, index) => (
                    <div key={index} className="video-item">
                        <video width="320" height="240" controls>
                            <source src={video.url} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                        <div>Detected Objects: {video.objects}</div>
                        <div>Detected People: {video.people}</div>
                        <div>File Name: {video.name}</div>
                        <div>Timestamp: {new Date(video.timestamp).toLocaleString()}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VideoLogs;
