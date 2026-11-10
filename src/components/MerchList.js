import {useState} from 'react';
import './MerchList.css';
import axiosInstance from '../api/axiosInstance';
import {useNavigate} from 'react-router-dom';


const MerchList = ({}) => {
    const navigate = useNavigate();
    const [merchs, setMerchs] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/api/merch')
        .then((res) => res.json())
        .then((data) => setMerchs(data))
        .catch((err) => console.error('❌ 굿즈 불러오기 실패: ', err));
    }, [])

    return(
        <div>

        </div>
    )
};

export default MerchList;