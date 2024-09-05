import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from "react-router-dom";
import linkArrow from '../../assets/link-arrow.svg'
import classes from './projectNavBar.module.css'

ProjectNavBar.propTypes = {
    currentId: PropTypes.string,
}

export default function ProjectNavBar({ currentId }) {
    const [projects, setProjects] = useState(null)
    useEffect(() => {
        fetch('https://present-cms.payloadcms.app/api/combinedprojects')
            .then(response => response.json())
            .then(data => {
                setProjects(shuffleArray(data.caseStudies.docs.concat(data.creativeDirectors.docs), currentId))
            })
            .catch(error => console.error(error));
    }, []);

    return (
        <div className='wSection'>
            <div className={classes.seeMoreHeader}>
                <Link to="/#projects">
                    <div className='arrowDiv'>
                        <h3>View all projects</h3>
                        <img src={linkArrow} alt="arrow" />
                    </div>
                </Link>
            </div>
            <div className={classes.projectGallery}>
                {projects &&
                    (Object.entries(projects.slice(0, 3)).map(([key, value]) => (
                        <div key={key}>
                            <Link to={getUrl(value)} >
                                <img src={value.thumbnail.url} alt={value.thumbnail.url} className={classes.square} />
                                <h4>{value.name}</h4>
                            </Link>
                        </div>
                    )))
                }
            </div>
        </div>
    )
}

function getUrl(project) {
    if ( Object.hasOwn(project, 'team')) {
        return '/case-study/' + project.id
    }
    return '/creative-director/' + project.id
}

function shuffleArray(array, currentId) {
    if (array != null) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array.filter((el) => el.id != currentId)
    }
    return null
}