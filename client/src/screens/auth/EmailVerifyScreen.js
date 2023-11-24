import { useEffect, useState } from "react";
import axios from 'axios';
import Message from "../../components/Message";

const EmailVerifyScreen = ({match, history}) =>{
    const id = match.params.id;
    const token = match.params.token;
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const[loading, setLoading] = useState(false);
    const baseURL = `http://localhost:4000/api/user/SignUp_verification/${id}/${token}`;


    if(userInfo)
    {
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        history.push('/')
    }

    useEffect(async () => {
        try {
            await axios.get(baseURL).then(res => {
                setUserInfo(res.data.userInfo)
            })
        }
        catch (error) {
            setError(error.response && error.response.data.detail
                ? error.response.data.detail
                : "network error");
        }
    }, [id, token, userInfo])



    return(
        <>
       
       {error && <Message variant='danger'>{error}</Message>}
      
        </>
    )
}
export default EmailVerifyScreen;;
