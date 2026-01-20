import React, { useState, useEffect } from 'react';
import './Gallery.css';
import { FaInstagram, FaPlay, FaTimes } from 'react-icons/fa';

const Gallery = () => {
    // Using the same feed URL as existing InstagramFeed
    const FEED_URL = "https://feeds.behold.so/aNaxawvpROW0Y41Wg56K";

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState(null);

    // Premium bakery style fallback images
    const staticImages = [
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1612203985729-70726954388c?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&q=80&w=600"
    ];

    const initialStaticData = staticImages.map((url, i) => ({
        id: `static-${i}`,
        mediaUrl: url,
        thumbnailUrl: url,
        permalink: "https://www.instagram.com/vanillaandscotch/?hl=en",
        mediaType: "IMAGE",
        caption: "Premium Cake Gallery"
    }));

    useEffect(() => {
        const fetchInstagramPosts = async () => {
            setLoading(true);
            try {
                const response = await fetch(FEED_URL);
                const data = await response.json();
                const feedData = data.posts || data;

                if (Array.isArray(feedData)) {
                    const formattedPosts = feedData.map(post => {
                        // ROBUST MEDIA DETECTION
                        let type = post.mediaType || 'IMAGE';
                        const isVideo = type === 'VIDEO' || (post.mediaUrl && post.mediaUrl.endsWith('.mp4'));
                        if (isVideo) type = 'VIDEO';

                        // 1. Try to find the best display image
                        let displayImage =
                            post.sizes?.large?.mediaUrl ||
                            post.sizes?.medium?.mediaUrl ||
                            post.thumbnailUrl ||
                            post.mediaUrl ||
                            post.media_url ||
                            post.imageUrl;

                        // 2. Video URL
                        let videoUrl = null;
                        if (type === 'VIDEO') {
                            videoUrl = post.mediaUrl || post.media_url;
                        }

                        return {
                            id: post.id,
                            mediaUrl: displayImage,
                            videoUrl: videoUrl,
                            permalink: post.permalink || `https://www.instagram.com/p/${post.shortcode}/`,
                            mediaType: type,
                            caption: post.caption || ""
                        };
                    }).filter(post => post && post.mediaUrl);

                    // MERGE REAL POSTS WITH STATIC ONES TO ENSURE FULL GALLERY
                    // The API currently returns only 6 items. We will append static "premium" content 
                    // to flesh out the grid as requested by the user until the API reference is updated.
                    const combinedPosts = [...formattedPosts, ...initialStaticData];

                    setPosts(combinedPosts);
                } else {
                    setPosts(initialStaticData);
                }
            } catch (error) {
                console.error("Error fetching gallery:", error);
                setPosts(initialStaticData);
            } finally {
                setLoading(false);
            }
        };

        fetchInstagramPosts();
    }, []);

    const handleVideoClick = (e, post) => {
        if (post.mediaType === 'VIDEO' && post.videoUrl) {
            e.preventDefault();
            setSelectedVideo(post.videoUrl);
        }
    };

    const closeVideo = () => {
        setSelectedVideo(null);
    };

    return (
        <div className="gallery-page">
            <div className="gallery-container">
                <div className="gallery-header">
                    <h1>Our Gallery</h1>
                    <p>A glimpse into our kitchen & creations</p>
                    <a href="https://www.instagram.com/vanillaandscotch/" target="_blank" rel="noreferrer" className="gallery-insta-link">
                        @vanillaandscotch
                    </a>
                </div>

                <div className="masonry-grid">
                    {posts.map((post) => (
                        <div className="masonry-item" key={post.id} style={{ breakInside: 'avoid' }}>
                            <div className="gallery-card">
                                <img
                                    src={post.mediaUrl}
                                    alt={post.caption}
                                    className="gallery-img"
                                    loading="lazy"
                                    onError={(e) => { e.target.style.display = 'none' }} // Hide if broken
                                />

                                {/* Overlay Interaction */}
                                <div className="gallery-overlay">
                                    {post.mediaType === 'VIDEO' ? (
                                        <button
                                            className="play-button"
                                            onClick={(e) => handleVideoClick(e, post)}
                                            aria-label="Play Video"
                                        >
                                            <FaPlay />
                                        </button>
                                    ) : (
                                        <a
                                            href={post.permalink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="instagram-link-btn"
                                        >
                                            <FaInstagram />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {loading && <div className="loading-gallery">Loading gallery...</div>}
            </div>

            {/* Video Modal */}
            {selectedVideo && (
                <div className="video-modal-overlay" onClick={closeVideo}>
                    <div className="video-modal-content" onClick={e => e.stopPropagation()}>
                        <button className="close-video-btn" onClick={closeVideo}>
                            <FaTimes />
                        </button>
                        <video
                            src={selectedVideo}
                            controls
                            autoPlay
                            className="modal-video"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Gallery;
