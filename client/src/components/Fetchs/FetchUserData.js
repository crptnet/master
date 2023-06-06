import axios from 'axios'
import { serverLink } from '../..'
/**
 * @param invokeTotp use when component works with TOTP Token 
 * Returns axios response.data in case of success
 * If error returns axios response.response
 */
const FetchUserData = async (invokeTotp, invokeUser) => {
    if(invokeUser && !localStorage.getItem('token')){
        localStorage.removeItem('totpToken')
        window.location.replace('/settings')
    }
    if(invokeTotp && localStorage.getItem('totpToken')){
        axios.get(`${serverLink}api/auth/otpt/ping`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                Totp : `Bearer ${localStorage.getItem('totpToken')}`
            },
        }).catch((err) => { 
            localStorage.removeItem('totpToken')
            window.location.reload(false);
            return err.response
        })
    }
    return axios.get(`${serverLink}api/current`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    }).then((res) => {
        localStorage.setItem('uid', res.data.id)
        localStorage.setItem('totp', res.data.topt_status)
        console.log('Data fetched')
        return res.data
    }).catch((err) => { 
        
        return err.response
    })
}

export {FetchUserData}