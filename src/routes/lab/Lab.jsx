import { useEffect, useState } from 'react'
import ReactPlayer from 'react-player/lazy'
import { useStateWithCallbackLazy } from 'use-state-with-callback';
import Header from '../../components/header/Header'
import Loading from '../../components/loading/Loading'
import Carousel from '../../components/carousel/Carousel'
import classes from './lab.module.scss'
import mutedImage from '../../assets/mute.svg'
import notMutedImage from '../../assets/unmute.svg'

export default function Lab() {
    const [muted, setMuted] = useState(true)
    const [content, setContent] = useStateWithCallbackLazy(null)

    useEffect(() => {
        fetch('https://present-cms.payloadcms.app/api/globals/innovation-lab')
            .then(response => response.json())
            .then(data => {
                setContent(data, () => window.scrollTo(0, 0))
            })
            .catch(error => console.error(error));
    }, []);

    return (
        <>
            <Header />
            {content ? (
                <>
                    <div className='spacer' style={{ borderBottom: 0 }} />
                    <div className="section">
                        <div className='headerContainer'>
                            <div style={{ display: 'flex', flexDirection: 'column', rowGap: "4rem" }}>
                                <h2 className='heroHeader'>{content.Headline}</h2>
                                <h3 className={classes.subtitle}>{content.HeadlineSubtitle}</h3>
                            </div>
                            <div style={{ position: 'relative' }}>
                                <ReactPlayer
                                    playsinline
                                    playing
                                    loop
                                    muted={muted}
                                    url={content.Reel.url}
                                    key={content.Reel.url}
                                    width="100%" height="100%"
                                    onClick={() => setMuted(prev => !prev)}
                                />
                                <div style={{ position: 'absolute', bottom: '2rem', left: '1.5rem', width: '2rem', height: '2rem', pointerEvents: 'none' }}>
                                    {muted ? <img src={mutedImage} alt="muted" /> : <img src={notMutedImage} alt="not muted" />}
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="spacer" style={{ borderColor: 'rgba(0,0,0,0)' }} />
                    <div className={`galleryContainer`}>
                        <div className='imgBox'>
                            <Carousel images={content.gallery} />
                        </div>
                    </div>
                </>
            ) : <Loading />}
        </>
    )
}