import ServerLink from '..'

export function fetchAPIKeys(){
    return fetch(`${ServerLink}api/api-account`, {
        method : 'GET',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    }).then((res) => res.json())
}