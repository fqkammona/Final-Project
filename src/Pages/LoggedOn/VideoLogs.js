import './VideoLogs.css';
import React, { useEffect, useState } from 'react';
import { storage, db } from '../../firebase-config';
import 'firebase/storage';
import firebase from 'firebase/app';
import { collection, onSnapshot } from 'firebase/firestore';

const VideoLogs = () => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        // Listen for real-time updates
        const unsubscribe = onSnapshot(collection(db, 'videos'), (snapshot) => {
            const vids = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setVideos(vids);
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    return (
        <div className="VideoLogs-page">
            <h1>Video Logs</h1>
            {videos.map(video => (
                <div key={video.id}>
                    <video width="320" height="240" controls>
                        <source src={video.url} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <p>Uploaded on: {new Date(video.uploaded).toLocaleDateString()}</p>
                </div>
            ))}
        </div>
    );
};

export default VideoLogs;