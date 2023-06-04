import axios from 'axios'
import { serverLink } from '../..'
/**
 * Returns axios response.data in case of success
 * If error reutrns axios response.response
 */
const FetchUserData = () => {
    axios.get(`${serverLink}api/current`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    }).then((res) => {
        console.log(res)
        localStorage.setItem('uid', res.data.id)
        localStorage.setItem('topt', res.data.topt_status)
        return res.data
    }).catch((err) => { 
        return err.response
    })
}

export {FetchUserData}