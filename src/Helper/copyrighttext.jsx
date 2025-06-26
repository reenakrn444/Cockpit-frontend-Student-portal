import Heart from "../../public/images/Heart.gif"
import { Link } from 'react-router-dom';

const CopyrightFooter = () => {
    const currentYear = new Date().getFullYear();
    return (
        <>
            {/* Made for Aviators with <div class="tenor-gif-embed" data-postid="15442334041274944339" data-share-method="host" data-aspect-ratio="0.829317" data-width="100%"><a href="https://tenor.com/view/heart-love-beating-heart-heartbeat-heart-beat-gif-15442334041274944339">Heart Love Sticker</a>from <a href="https://tenor.com/search/heart-stickers">Heart Stickers</a></div> <script type="text/javascript" async src="https://tenor.com/embed.js"></script> to see them in Cockpit one day | Copyright © {currentYear}{' '}
            <Box component="span" sx={{ color: '#EAB308', display: 'inline' }}>
                Cockpit
            </Box>{' '}
            Inc. All rights reserved */}
            Made for Aviators with
            <img
                // src="https://tenor.com/view/heart-love-beating-heart-heartbeat-heart-beat-gif-15442334041274944339.gif"
                src={Heart}
                alt="heart"
                style={{
                    width: '14px',
                    height: '14px',
                    verticalAlign: 'middle',
                    margin: '0 4px',
                    backgroundColor: 'transparent',
                }}
            />
            to see them in Cockpit one day | Copyright © {currentYear}{' '}
            <Box component={Link}
              to="/" sx={{ color: '#EAB308', display: 'inline', textDecoration : "none" }}>
                Cockpit
            </Box>{' '}
            Inc. All rights reserved
        </>
    );
};

export default CopyrightFooter;
