import {useState} from "react";

const usePagination = (data: any[], itemsPerPage: number) => {
    const [currentPage, setCurrentPage] = useState(1)
    const maxPage = Math.ceil(data.length / itemsPerPage)

    const next = () => {
        setCurrentPage((currentPage) => Math.min(currentPage + 1, maxPage))
    }
    const prev = () => {
        setCurrentPage((currentPage) => Math.max(currentPage - 1, 1))
    }

    const jump = (page: number) => {
        const pageNumber = Math.max(1, page)
        setCurrentPage((currentPage) => Math.min(pageNumber, maxPage));
    }

    const currentData = () => {
        const begin = (currentPage - 1) * itemsPerPage;
        const end = begin + itemsPerPage;
        return data.slice(begin, end);
    }

    return {next, prev, jump, currentData, currentPage, maxPage}
}

export default usePagination