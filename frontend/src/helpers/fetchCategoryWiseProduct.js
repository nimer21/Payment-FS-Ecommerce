import SummaryApi from "../common";

const fetchCategoryWiseProduct = async(category) => {
    const response = await fetch(SummaryApi.categoryWiseProduct.url,
        {
            method: SummaryApi.categoryWiseProduct.method,
            headers: SummaryApi.categoryWiseProduct.headers,
            body: JSON.stringify({ category : category }),
        }
    );
    const dataResponse = await response.json();
    return dataResponse;
};
export default fetchCategoryWiseProduct