import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import 'videojs-contrib-hls';
import withAuth from '@component/withAuth';
import { Box } from '@chakra-ui/react';



const LiveFeed = ({source}) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const loadPlayer = async () => {
      const videoElement = videoRef.current;
      const player = videojs(videoElement);

    
      class HlsTech extends videojs.getTech('Html5') {
        static canPlayType(type) {
          return videojs.getTech('Html5').canPlayType(type);
        }

        src(_, src) {
          if (src) {
            this.el_.src = src;
            this.el_.setAttribute('type', 'application/x-mpegURL');
          }
        }
      }

      videojs.registerTech('HlsTech', HlsTech);
      player.src({
        src: source,
        type: 'application/x-mpegURL'
      });

      return () => {
        player.dispose();
      };
    };

    loadPlayer();
  }, [source]);

  return(
    <Box width="100%" height="auto" borderRadius="md" overflow="hidden">
     
    <video  ref={videoRef} controls className="video-js" style={{ position:'relative',aleft: 0, width: '100%',  }} />
  </Box>

  ) ;
};

export default withAuth(LiveFeed);
