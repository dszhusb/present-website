import { useEffect } from 'react'
import useStateWithCallback from 'use-state-with-callback'
import Header from '../../components/header/Header'
import DotList from '../../components/dotList/DotList'
import classes from './about.module.css'

export default function About() {
    const [content, setContent] = useStateWithCallback(null, () => {
    })

    useEffect(() => {
        fetch('https://present-cms.payloadcms.app/api/globals/about?locale=undefined&draft=false&depth=1')
            .then(response => response.json())
            .then(data => {
                setContent(data)
            })
            .catch(error => console.error(error));
    }, []);

    return (
        <>
            <Header />
            {content && (
                <>
                    <div className='spacer' />
                    <div className="section">
                        <div className='headerContainer'>
                            <h2 className='heroHeader'>{content.Headline}</h2>
                            <img src={content.HeaderImage.url} key={content.HeaderImage.url} />
                        </div>
                    </div>
                    <hr />
                    <div className="section">
                        <div className={classes.listContainer}>
                            <DotList list={content.ContentList[0]} />
                        </div>
                    </div>
                </>
            )}
        </>
    )
}