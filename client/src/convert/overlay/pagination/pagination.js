import ModelOverlay from '../model';
import { v4 as uuidv4 } from 'uuid';

export default function Pagination() {
    const model = ModelOverlay('to');
    const {
        currentPage,
        setCurrentPage,
        coinsPerPage
    } = model;

    const handlePageChange = (e) => {
        const pageNumber = parseInt(e.target.value, 10);
        if (pageNumber >= 1 && pageNumber <= Math.ceil(2500 / coinsPerPage)) {
            setCurrentPage(pageNumber);
        }
    };

    return (
        <div>
            <input
            type="number"
            value={currentPage}
            min="1"
            max={Math.ceil(2500 / coinsPerPage)}
            onChange={handlePageChange}
            />
            <span> of {Math.ceil(2500 / coinsPerPage)}</span>
            <button key={uuidv4()} onClick={() => setCurrentPage(currentPage + 1)} className='paginationBtn'>Next</button>
            <button key={uuidv4()} onClick={() => setCurrentPage(currentPage - 1)} className='paginationBtn'>Previous</button>
        </div>
    );
};