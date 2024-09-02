import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { useMediaQuery } from 'react-responsive'
import ReactPlayer from 'react-player/lazy'
import useStateWithCallback from 'use-state-with-callback';
import Header from '../../components/header/Header'
import Loading from '../../components/loading/Loading'
import classes from './creativeDirector.module.css'
import mutedImage from '../../assets/mute.svg'
import notMutedImage from '../../assets/unmute.svg'

export default function CreativeDirector() {
    const { id } = useParams();
    const [muted, setMuted] = useState(true)
    const [content, setContent] = useStateWithCallback(null, () => {
    })

    const isTabletUp = useMediaQuery({ query: '(min-width: 768px)' })

    useEffect(() => {
        fetch('https://present-cms.payloadcms.app/api/creative-directors/' + id + '?locale=undefined&draft=true&depth=1')
            .then(response => response.json())
            .then(data => {
                setContent(data)
            })
            .catch(error => console.error(error));
    }, []);

    return (
        <>
            <Header />
            {content ? (
                <>
                    <div className='spacer' />
                    <div className="section">
                        <div style={{ position: 'relative' }}>
                            <ReactPlayer
                                playing
                                loop
                                muted={muted}
                                url={content.reel.url}
                                key={content.reel.url}
                                width="100%" height="100%"
                                onClick={() => setMuted(prev => !prev)}
                            />
                            <div style={{ position: 'absolute', bottom: '2rem', left: '1.5rem', width: '2rem', height: '2rem', pointerEvents: 'none' }}>
                                {muted ? <img src={mutedImage} alt="muted" /> : <img src={notMutedImage} alt="not muted" />}
                            </div>
                        </div>
                    </div>
                    <div className={`${classes.infoSection} section`}>
                        <div className={classes.subtitleContainer}>
                            <div className={classes.leftItem}>
                                {isTabletUp && <img className={classes.square} src={content.profileImage.url} alt={content.name} />}
                                <div>
                                    <h3 className={classes.mediumWeight}>{content.name}</h3>
                                    <div>
                                        <h6>Role</h6>
                                        <p>Creative Director</p>
                                    </div>
                                </div>
                                <div>
                                    <h6>Socials</h6>
                                    {Object.entries(content.socials).map(([key, value]) => (
                                        <div key={key}>
                                            <a href={value.url} target="_blank">{value.label}</a>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className={classes.subtitle}>
                                <p style={{ textTransform: 'none' }}>{content.description}</p>
                            </div>
                        </div>
                    </div>
                </>
            ) : <Loading />}
        </>
    )
}