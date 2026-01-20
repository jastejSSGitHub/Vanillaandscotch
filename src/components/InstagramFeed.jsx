import React, { useState, useEffect } from 'react';
import './InstagramFeed.css';
import { FaInstagram } from 'react-icons/fa';

const InstagramFeed = () => {
    // -------------------------------------------------------------------------
    // INSTRUCTIONS FOR REAL-TIME INSTAGRAM FEED:
    // 1. Go to https://behold.so/ (it's free and secure).
    // 2. Click "Get Started" and connect your Instagram account.
    // 3. It will generate a JSON Feed URL for you.
    // 4. Paste that URL into the `FEED_URL` variable below.
    //    Example: "https://feeds.behold.so/YOUR-UNIQUE-ID"
    // -------------------------------------------------------------------------
    const FEED_URL = "https://feeds.behold.so/aNaxawvpROW0Y41Wg56K"; // PASTE YOUR FEED URL HERE

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    // Premium bakery style fallback images (used if no feed URL is provided)
    const staticImages = [
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=400", // Cake
        "https://images.unsplash.com/photo-1612203985729-70726954388c?auto=format&fit=crop&q=80&w=400", // Pastry
        "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?auto=format&fit=crop&q=80&w=400", // Cupcake
        "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&q=80&w=400", // Cake Slice
        "https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&q=80&w=400", // Brownie
        "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&q=80&w=400"  // Whisk/Process
    ];

    // If using static images, duplicate them to create 12 items for the grid
    const initialStaticData = staticImages.concat(staticImages).map(url => ({
        mediaUrl: url,
        permalink: "https://www.instagram.com/vanillaandscotch/?hl=en",
        id: Math.random() // Temp ID for key
    }));

    useEffect(() => {
        if (!FEED_URL) {
            setPosts(initialStaticData);
            return;
        }

        const fetchInstagramPosts = async () => {
            setLoading(true);
            try {
                const response = await fetch(FEED_URL);
                const data = await response.json();

                // standardize data format
                // behold.so returns object with 'mediaUrl', 'permalink', 'caption', 'id'
                const feedData = data.posts || data;

                const formattedPosts = feedData.map(post => {
                    // Behold.so provides resized images in a 'sizes' object - best for performance & consistency
                    // If it's a VIDEO/Reel, 'mediaUrl' is an mp4, so we must use 'thumbnailUrl' or 'sizes'
                    const imageUrl =
                        post.sizes?.large?.mediaUrl ||
                        post.sizes?.medium?.mediaUrl ||
                        post.thumbnailUrl ||
                        post.mediaUrl ||
                        post.media_url ||
                        post.imageUrl;

                    return {
                        id: post.id,
                        mediaUrl: imageUrl,
                        permalink: post.permalink || `https://www.instagram.com/p/${post.shortcode}/`,
                        caption: post.caption || ""
                    };
                }).slice(0, 12); // Limit to 12 posts to fit the grid (2 rows of 6)

                setPosts(formattedPosts);
            } catch (error) {
                console.error("Error fetching Instagram feed:", error);
                setPosts(initialStaticData); // Fallback on error
            } finally {
                setLoading(false);
            }
        };

        fetchInstagramPosts();
    }, []);

    return (
        <section className="instagram-section">
            <div className="container">
                <div className="instagram-header">
                    <h2 className="instagram-title">@vanillaandscotch</h2>
                    <p className="instagram-subtitle">Follow the sweetness on Instagram</p>
                </div>

                <div className="instagram-grid">
                    {posts.map((post, i) => (
                        <a
                            key={post.id || i}
                            href={post.permalink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="instagram-item"
                        >
                            <div className="instagram-image-wrapper">
                                <img src={post.mediaUrl} alt={post.caption || "Instagram Post"} />
                                <div className="instagram-overlay">
                                    <FaInstagram />
                                </div>
                            </div>
                        </a>
                    ))}
                    {loading && <div className="loading-state">Loading sweets...</div>}
                </div>

                <div className="instagram-actions">
                    <a href="https://www.instagram.com/vanillaandscotch/?hl=en" target="_blank" rel="noopener noreferrer" className="btn-instagram">
                        Go to Instagram
                    </a>
                </div>
            </div>
        </section>
    );
};

export default InstagramFeed;
