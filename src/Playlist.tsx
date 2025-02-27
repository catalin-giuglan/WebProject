import './App.css'

function Playlist({name, likes, description, thumbnail_images, creator, tags, creator_picture, date}: {name: string, likes: string, description: string, thumbnail_images: string[], creator: string, tags: string[], creator_picture: string, date: string}) {
    return (
        <div className='video-container' style={{ display: "flex", flexDirection: "column", gap: 20, alignItems: "flex-start", position: "relative", outline: "2px solid black", padding: "10px"}}>
            <div className="thumbnail-image">
                {thumbnail_images.map((img, index) => (
                    <img key={index} src={img} alt={`Thumbnail ${index + 1}`} style={{width: '300px', height: '150px'}} />
                ))}
            </div>
            <div style={{ fontSize: '20px', fontFamily: 'revert', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft: '20px' }}>
                <h3 style={{ margin: "10px 0" }}>{name}</h3>
                <p style={{ margin: "10px 0", display: 'flex', alignItems: 'center' }}>
                    <img src={creator_picture} alt="Creator" style={{ width: 25, height: 25, marginRight: '10px', borderRadius: '50%'}} />
                    {creator}
                </p>
                <p style={{ margin: "10px 0" }}>{description}</p>
                <p style={{ margin: "10px 0", display: 'flex', alignItems: 'center' }}>
                    <img src="./like.png" alt="Likes" style={{ width: 20, filter: 'invert(1)', marginRight: '10px'}} />
                    {likes}
                    <span style={{ marginLeft: '20px' }}>{date}</span>
                </p>
            </div>
        </div>
    )
}

export default Playlist
