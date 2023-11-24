
import * as React from 'react';
import { useHistory } from "react-router-dom";
import Pagination from '@mui/material/Pagination';
export default function Paginate({ pages, page, keyword = '', isAdmin = '' }) {
    const history = useHistory();

    const [cur, setCur] = React.useState(null);

    if (keyword) {
        keyword = keyword.split('?keyword=')[1].split('&')[0]
    }
    const handleChange = (event, value) => {
        if (isAdmin) {
            history.push(`/admin/productlist/?keyword=${keyword}&page=${value}`);
        }
        else {
            history.push(`/?keyword=${keyword}&page=${value}`);
        }
        setCur(value);
    }
    return (
        <>
            {
                pages ? <Pagination count={parseInt(pages)} page={parseInt(page)} color="secondary" onChange={handleChange} /> : null
            }
        </>
    );
}
