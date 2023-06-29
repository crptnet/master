import { serverLink } from '../..'

export function fetchAPIKeys(){
    return fetch(`${serverLink}api/api-account`, {
        method : 'GET',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    }).then((res) => res.json())
}