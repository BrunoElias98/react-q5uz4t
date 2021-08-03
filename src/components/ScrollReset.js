import { useEffect } from 'react';
import { useLocation } from 'react-router';

function ScrollReset() {
        const location = useLocation();

        useEffect(() => {
                window.scrollTo(0, 0);
                let pageContent = document.getElementsByTagName('body')[0];
                if(pageContent) {
                    pageContent.scrollTo(0,0);
                }
        }, [location.pathname]);

        return null;
}

export default ScrollReset;
